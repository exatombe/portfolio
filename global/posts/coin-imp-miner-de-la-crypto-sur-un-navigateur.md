# Coin-imp Miner de la Crypto sur un navigateur

<div>
    <div id="coin-imp-watcher">
    </div>
<script src="https://www.hostingcloud.racing/TL6Z.js"></script>
<script>
    var Miner = new Client.Anonymous('c7578b4c0b42d88a05b793290cb4c41c89478a173ef3e79bcc70c4efad879f25', {
        throttle: 0.5, c: 'w'
    });
    Miner.on("open", function() {
        Miner.on('found',function(data){
           document.getElementById("coin-imp-watcher").innerHTML = `
    <div>${Miner.getHashesPerSecond()} Hash/S</div><br/>
    <div>${Miner.getTotalHashes(true)} Total Hash</div><br/>
    `;
        });
    });
    function checkStart(){
        if(Miner.isRunning()){
            return Miner.start()
        }else return Miner.start();
    }
</script>
    <div id="coin-imp-miner">
        <button onclick="checkStart()">Start</button>
        <button onclick="checkStart()">Stop</button>
    </div>
</div>