import React, { useEffect, useState } from 'react';

//api
import {getCoin} from "../services/api";

//component
import Coin from './Coin';

//style
import styles from "./Landing.module.css";

const Landing = () => {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getCoin();
            setCoins(data)
        }

        fetchApi();
    },[])
   console.log(coins)

    const searchHandler = event => {
        setSearch(event.target.value)
    }

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <input className={styles.search} type="text" placeholder='search' value={search} onChange={searchHandler} />
            <div className={styles.container}>
                {
                    searchedCoins.length ?
                    searchedCoins.map(coin =>  <Coin 
                        key={coin.id}
                        image={coin.image}
                        name={coin.name}
                        symbol={coin.symbol}
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        marketCap={coin.market_cap}
                        />) :
                    "loading"
                }
            </div>
        </>
    );
};

export default Landing;