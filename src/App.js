import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  // エンドポイントのURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon/";
  // ローディング状態を管理するステート
  const [loading, setLoading] = useState(true);
  // ポケモンデータを管理するステート
  const [pokemonData, setPokemonData] = useState([]);
  // 次のページのURLを管理するステート
  const [nextURL, setNextURL] = useState("");
  // 前のページのURLを管理するステート
  const [prevURL, setPrevURL] = useState("");


  // コンポーネントがマウントされたときに実行される
  useEffect(() => {
    const fetchPokemonData = async() => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
	//   console.log(res.next);
	  setNextURL(res.next);
      // ローディング状態を解除
	  setPrevURL(res.previous); //null
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  // 各ポケモンの詳細なデータを取得する関数
  const loadPokemon = async (data) => {
    // 各ポケモンの詳細データを非同期で取得し、_pokemonDataに格納
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // 各ポケモンの詳細データを取得
		// console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // 取得したポケモンデータをステートにセット
    setPokemonData(_pokemonData);
  };

  // デバッグ用にポケモンデータをコンソールに出力
  console.log(pokemonData);

	const handleNextPage = async() =>{
		setLoading(true);
		let data = await getAllPokemon(nextURL);
		// console.log(data);
		await loadPokemon(data.results);
		setNextURL(data.next);
		setPrevURL(data.previous);
		setLoading(false);
	};
	const handlePrevPage = async() => {
		if(!prevURL) return;

		setLoading(true);
		let data = await getAllPokemon(prevURL);
		await loadPokemon(data.results);
		setNextURL(data.next);
		setPrevURL(data.previous);
		setLoading(false);
	};

  return (
	<>
    <div className="App">
      {/* ローディング中かどうかで表示を切り替える */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
		<Navbar />
          {/* <h1>ポケモンデータを取得しました</h1> */}
          <div className='pokemonCardContainer'>
            {/* 取得したポケモンデータをカードコンポーネントとして表示(0から19個までのデータを繰り返す。) */}
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
		  <div className="btn">
			 <button onClick={handlePrevPage}>前へ</button>
			 <button onClick={handleNextPage}>次へ</button>
		  </div>
        </>
      )}
    </div>
	  </>
  );
}

export default App;
