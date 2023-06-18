import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from 'react-bootstrap'
import Hero from './Hero';
import NFTCard from "./NFTCard";
import Explore from "./Explore";
import './style/Home.css';

const Home = ({ marketplace, nft }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const loadMarketplaceItems = async () => {
        const itemCount = await marketplace.itemCount()
        let items = []
        for(let i = 1; i <= itemCount; i++){
            const item = await marketplace.items(i)
            if(!item.sold){
                // get uri url from nft contract
                const url = await nft.tokenURI(item.tokenId)
                // use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(url);
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                // Add item to item array
                items.push({totalPrice, itemId: item.itemId, seller: item.seller, name: metadata.name, description: metadata.description, image: metadata.image})
            }
        }
        setItems(items)
        setLoading(false)
    }

    const buyMarketItem = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems()
    }
    useEffect(() => {
        loadMarketplaceItems()
    }, [])

    if(loading) return(
        <main style={{ padding: '1rem 0' }}>
            <h2>Loading...</h2>
        </main>
    )
    

    return (
        <div id="home" className="flex justify-center">
            <Hero/>
            <h2 id="hotDots" >Hot.. Dots..</h2>
            {items.length > 0 ?
                <div className="px-5 container">
                    <Row xs={1} md={2} lg={4} className="g-4 py-5">
                        {items.map((item, idx) => (
                            <NFTCard item={item} buyMarketItem={buyMarketItem}/>
                            // <Card style={{background: "black", border: "solid white"}} >
                            //     <Card.Img variant="top" src={item.image} />
                            //     <Card.Body color="secondary">
                            //     <Card.Title>{item.name}</Card.Title>
                            //     <Card.Text>
                            //         {item.description}
                            //     </Card.Text>
                            //     </Card.Body>
                            //     <Card.Footer>
                            //     <div className='d-grid'>
                            //         <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                            //             Buy for {ethers.utils.formatEther(item.totalPrice)} DTP
                            //         </Button>
                            //     </div>
                            //     </Card.Footer>
                            // </Card>
                        ))}
                    </Row>
                </div>
                : (
                    <main style={{padding: "1rem 0"}}>
                        <h2 style={{color: "white"}} >No Listed Assets</h2>
                    </main>
                )
            }
        </div>
    );
}

export default Home;