const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num);

describe("NFTMarketplace", () => {
    let deployer, addr1, addr2, nft, marketplace
    let feePercent = 1
    let URI = "Sample URI"
    beforeEach(async () => {
        // Get Contract Factories
        const NFT = await ethers.getContractFactory("NFT");
        const Marketplace = await ethers.getContractFactory("Marketplace");

        // Get Signers
        [deployer, addr1, addr2] = await ethers.getSigners()

        // Deploy Contracts
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);
    });
    
    describe("Deployement", () => {
        it("tracks name and symbol of NFT collection", async () => {
            expect(await nft.name()).to.equal("Dot Points");
            expect(await nft.symbol()).to.equal("DTP");
        });

        it("tracks feeAccount and FeePercent of the marketplace", async () => {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        });
    })

    describe("Minting NFTs", () => {
        it("tracks each minted NFT", async () => {
            // addr1 mint an NFT
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);
            // addr2 mint an NFT
            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        })
    })

    describe("Making marketplace items", () => {
        beforeEach(async () => {
            // addr1 mints an NFT
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to send NFTs
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
        })
        it("tracks newly created items, transfer NFT from seller to marketplace and emit Offered event", async () => {
            // addr1 offers their nft at a price of 1 ether
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1, toWei(1)))
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(1),
                    addr1.address
                )
            // Owner of the NFT should now be the marketplace
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            // Get Items from item mapping then check fields to ensure they are correct
            const item = await marketplace.items(1)
            expect(item.itemId).to.equal(1)
            expect(item.nft).to.equal(nft.address)
            expect(item.tokenId).to.equal(1)
            expect(item.price).to.equal(toWei(1))
            expect(item.sold).to.equal(false)
        })

        it("fail if price is set to zero", async () => {
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1, 0)).to.be.revertedWith("Price must be greater then zero");
        });
    })

    describe("Purchasing marketplace items", () => {
        let price = 2;
        let totalPriceInWei;
        beforeEach(async () => {
            // addr1 mints an NFT
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to spend NFT
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
            // addr1 makes their nft a marketplace item
            await marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price))
        })

        it("Updates item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async () => {
            const sellerInitialEthBal = await addr1.getBalance();
            const feeAccountInitialEthBal = await deployer.getBalance();
            // fetch items total price (market fees + item price)
            totalPriceInWei = await marketplace.getTotalPrice(1);
            // addr2 purchase item.
            await expect(marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei }))
                .to.emit(marketplace, "Bought")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(price),
                    addr1.address,
                    addr2.address
                )
            // fetch final Balance
            const sellerFinalEthBal = await addr1.getBalance();
            const feeAccountFinalEthBal = await deployer.getBalance();
            // seller should recieve payment for the price of the NFT sold.
            expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitialEthBal))
            // calculate fee
            const fee = (feePercent / 100)*price
            // feeAccount should recieve fee
            expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal))
            // Buyer should now own the NFT
            expect(await nft.ownerOf(1)).to.equal(addr2.address);
            // Item should be marked as sold
            expect((await marketplace.items(1)).sold).to.equal(true)
        })

        it("Should fail for invalid item ids, sold items and when not enough ether is paid", async () => {
            // fails for invalid item ids
            await expect(marketplace.connect(addr2).purchaseItem(2, {value: totalPriceInWei})).to.be.revertedWith("item doesn't exist");
            await expect(marketplace.connect(addr2).purchaseItem(0, {value: totalPriceInWei})).to.be.revertedWith("item doesn't exist");
            // Fails when not enough ether is paid with the transaction. 
            // In this instance, fails when buyer only sends enough ether to cover the price of the nft
            // not the additional market fee.
            await expect(marketplace.connect(addr2).purchaseItem(1, {value: toWei(price)})).to.be.revertedWith("not enough ether to cover item price and market fee"); 
            // addr2 purchases item 1
            await marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
            // deployer tries purchasing item 1 after its been sold 
            await expect(marketplace.connect(deployer).purchaseItem(1, { value: totalPriceInWei })).to.be.revertedWith("item already sold");
        })
    })
})