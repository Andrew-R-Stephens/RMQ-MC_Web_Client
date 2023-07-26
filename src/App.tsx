import {Fragment, useEffect, useState} from 'react'
import './App.css'

import client, {Channel, Connection} from 'amqplib';

function App() {

    const [serverStatus, setServerStatus] = useState(200)

    useEffect(() => {
        pollServer().then(r => console.log(r));
    })

    async function pollServer() {
        const connection: Connection = await client.connect(
            'amqp://end_user:Mattr3ss12RMQG0al1312@34.193.54.26:5672'
        )

        // Create a channel
        const channel: Channel = await connection.createChannel()

        // Makes the queue available to the client
        await channel.assertQueue('myQueue').then(()=> {
            /*console.log('buffer', Buffer.from('foo', 'hex'))*/
            channel.sendToQueue('myQueue', Buffer.from("Hello"));
        })


    }

    function displayServerStatus() {

        switch(serverStatus) {
            case 200: return "Online"
            case 503: return "Offline"
        }

    }

    return (
        <Fragment>
            <div>
                <div style={{display: 'inline-block'}}>
                    <h3>Check Server Status</h3>
                    <div style={{display: 'flex'}}>
                        <input type={'button'} value={'Check'}></input>
                        <label style={{width:'100%'}}>{displayServerStatus()}</label>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default App
