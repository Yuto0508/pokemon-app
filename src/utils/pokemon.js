// 全てのポケモンを取得する関数
export const getAllPokemon = (url) => {
	// Promiseオブジェクトを返す
	//Promiseオブジェクトは、非同期処理の結果を表すオブジェクト。
	//Promiseは、将来完了する可能性のある処理を表現し、その結果の値や失敗の理由を処理するためのメソッドを提供。
    return new Promise((resolve, reject) => {
        // fetch APIを使用してデータを取得
        fetch(url)
        .then((res) => 
            // レスポンスをJSON形式に変換
            res.json()
        )
        .then((data) => 
            // 変換されたデータを解決
            resolve(data)
        )
        .catch((error) => 
            // エラーが発生した場合は拒否
            reject(error)
        );
    });
};

// 特定のポケモンを取得する関数
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        // fetch APIを使用してデータを取得
        fetch(url)
        .then((res) => 
            // レスポンスをJSON形式に変換
            res.json()
        )
        .then((data) => {
            // 変換されたデータを解決
			// console.log(data);
            resolve(data);
        })
        .catch((error) => 
            // エラーが発生した場合は拒否
            reject(error)
        );
    });
};
