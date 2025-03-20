import React, { useState, useEffect } from 'react';
import './Card.css';

export const Card = ({ pokemon }) => {
    // ポケモンの名前を管理するステート
    const [pokemonName, setPokemonName] = useState([]);

    // ポケモンのタイプURLを管理するステート
    const [pokemonTypeURLs, setPokemonTypeURLs] = useState([]);

    // ポケモンのタイプを管理するステート
    const [pokemonType, setPokemonType] = useState([]);

    // ポケモンの名前の詳細URLを取得
    let pokemonNameDetail = pokemon.species.url;
    // console.log(pokemonNameDetail);

    // ポケモンの名前を取得する関数
    const loadPokemonName = async (data) => {
        let response = await fetch(data);
        let result = await response.json();
        // 日本語の名前を取得
        let jaName = result.names.find(name => name.language.name === "ja").name;
        // console.log(jaName);
        // ステートに日本語の名前をセット
        setPokemonName(jaName);
    };

    // ポケモンのタイプを取得する関数
    const loadPokemonType = async (data) => {
        let _pokemonType = await Promise.all(
            data.map(async (url) => {
                let response = await fetch(url);
                let result = await response.json();
                let jaName = result.names.find(name => name.language.name === "ja").name;
                return jaName;
            })
        );
        // console.log(_pokemonType);
        let joinedTypes = _pokemonType.join(" / ");
        setPokemonType(joinedTypes);
    };

    // コンポーネントがマウントされたときに実行される
    useEffect(() => {
        // ポケモンの名前を取得
        loadPokemonName(pokemonNameDetail);

        // ポケモンのタイプURLを指定
        let resPokemonTypes = pokemon.types.map((v) => v.type.url);
        setPokemonTypeURLs(resPokemonTypes);
    }, [pokemonNameDetail, pokemon.types]);

    // ポケモンのタイプURLが変更されたときに実行される
    useEffect(() => {
        if (pokemonTypeURLs.length > 0) {
            loadPokemonType(pokemonTypeURLs);
        }
    }, [pokemonTypeURLs]);

    return (
        <div className="card">
            <div className="cardImg">
                {/* ポケモンの画像を表示 */}
                <img src={pokemon.sprites.front_default} alt=""></img>
            </div>
            <h3 className="cardName">{pokemonName}</h3>
            <div className="cardTypes">
                <div>タイプ</div>
                {/* ポケモンのタイプを表示 */}
                {pokemonType}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className="title">重さ: {pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ: {pokemon.height}</p>
                </div>
                <div className="cardData">
                    <p className="title">アビリティ: {pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
