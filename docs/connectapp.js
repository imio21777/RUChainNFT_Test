const connectWalletButton = document.getElementById('connectWalletButton');
const switchNetworkButton = document.getElementById('switchNetworkButton');
const networkSelect = document.getElementById('networkSelect');
const walletAddressElement = document.getElementById('walletAddress');
const mintNFTButton = document.getElementById('mintNFTButton');

const contractAddress='0x15122Ba4231a9ef13Abd76c55b5133Bfa9646561'
const tokenURI = "https://lime-far-lizard-157.mypinata.cloud/ipfs/QmdQSzBiGzN4pYYWodEBrzbn5VXrwdM4td9e9YRVqMwWW3"

// 初始化以太坊提供者
let provider;
let contract;

async function loadABI() {
    const response = await fetch('contractInfo.json');
    const data = await response.json();
    return data;
}

// 连接钱包的函数
async function connectWallet() {
    if (window.ethereum) {
        try {
            // 请求连接钱包
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            walletAddressElement.textContent = `钱包地址: ${account}`;
            
            // 使用 Ethers.js 创建一个提供者
            provider = new ethers.providers.Web3Provider(window.ethereum);

            const contractABI = await loadABI();
            contract = new ethers.Contract(contractAddress,contractABI,provider.getSigner());
        } catch (error) {
            console.error('用户拒绝了连接请求:', error);
        }
    } else {
        console.error('未检测到以太坊钱包，请安装 MetaMask。');
    }
}

// 切换网络的函数
async function switchNetwork() {
    if (window.ethereum) {
        const network = networkSelect.value;

        let chainId;
        let chainName;
        let rpcUrl;
        let nativeCurrency;
        let blockExplorerUrl;

        switch (network) {
            case 'sepolia':
                chainId = '0xAA36A7';
                chainName = 'Sepolia Test Network';
                rpcUrl = 'https://sepolia.infura.io/v3/174e1f5320264b4592d6d275b89ae1fd';
                nativeCurrency = {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                };
                blockExplorerUrl = 'https://sepolia.etherscan.io';
                break;
            case 'mainnet':
                chainId = '0x1';
                chainName = 'Ethereum Mainnet';
                rpcUrl = 'https://mainnet.infura.io/v3/174e1f5320264b4592d6d275b89ae1fd';
                nativeCurrency = {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                };
                blockExplorerUrl = 'https://etherscan.io';
                break;
            default:
                console.error('未选择有效的网络');
                return;
        }

        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: chainId,
                    chainName: chainName,
                    rpcUrls: [rpcUrl],
                    nativeCurrency: nativeCurrency,
                    blockExplorerUrls: [blockExplorerUrl],
                }],
            });
        } catch (error) {
            console.error('切换网络失败:', error);
        }
    } else {
        console.error('未检测到以太坊钱包，请安装 MetaMask。');
    }
}

async function mintNFT() {
    // contract=new ethers.Contract(contractAddress,contractABI,provider.getSigner());
    if (contract) {
        try {
            // 从钱包地址元素中提取纯净的地址
            const walletAddress = walletAddressElement.textContent.split(': ')[1];
            
            if (!walletAddress) {
                throw new Error('未找到有效的钱包地址');
            }

            console.log('正在铸造 NFT，地址:', walletAddress, 'Token URI:', tokenURI);  // 调试输出
            
            // 调用合约的 mintNFT 函数
            const tx = await contract.mintNFT(walletAddress, tokenURI);
            await tx.wait();
            alert('NFT 已成功铸造！');
        } catch (error) {
            console.error('铸造 NFT 失败:', error);
        }
    } else {
        console.error('合约未初始化，请先连接钱包。');
    }
}



// 绑定按钮事件
connectWalletButton.addEventListener('click', connectWallet);
switchNetworkButton.addEventListener('click', switchNetwork);
mintNFTButton.addEventListener('click', mintNFT);