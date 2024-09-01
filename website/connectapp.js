document.getElementById('connectWalletButton').addEventListener('click', async () => {
    console.log("连接钱包按钮已点击"); // 添加日志

    if (typeof window.ethereum !== 'undefined') {
        console.log("检测到以太坊钱包"); // 添加日志

        try {
            // 请求用户连接钱包
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log("已连接账户:", account); // 显示已连接的账户
            document.getElementById('walletAddress').innerText = `已连接钱包地址: ${account}`;
        } catch (error) {
            console.error("用户拒绝了连接请求", error);
        }
    } else {
        alert('请安装MetaMask!');
    }
});