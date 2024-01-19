'use strict'

const mList = ["suraimu", "suraimubesu", "doraki-", "go-suto", "mahoutukai", "meizidoraki-", "oosasori", "me-da",
                    "metorogo-suto", "dororu", "doraki-ma", "gaikotu", "madousi", "tetunosasori", "rikannto", "metarusuraimu",
                    "herugo-suto", "rikanntomarumu", "me-daro-do", "dororumeizi", "kimera", "sinosasori", "siryounokisi", 
                    "go-remu", "go-rudomann", "yoroinokisi", "meizikimera", "kagenokisi", "kira-rikannto", "doragonn",
                    "suta-kimera", "daimadou", "akumanokisi", "ki-sudoragonn", "suto-nnmann", "sinigaminokisi", 
                    "da-sudoragonn", "ryuuou"];

const mList2 = ["スライム", "スライムベス", "ドラキー", "ゴースト", "まほうつかい", "メイジドラキー", "おおさそり", "メーダ",
                    "メトロゴースト", "ドロル", "ドラキーマ", "がいこつ", "まどうし", "てつのさそり", "リカント", "メタルスライム",
                    "ヘルゴースト", "リカントマルム", "メーダロード", "ドロルメイジ", "キメラ", "しのさそり", "しりょうのきし", 
                    "ゴーレム", "ゴールドマン", "よろいのきし", "メイジキメラ", "かげのきし", "キラーリカント", "ドラゴン",
                    "スターキメラ", "だいまどう", "あくまのきし", "キースドラゴン", "ストーンマン", "しにがみのきし", 
                    "ダースドラゴン", "りゅうおう"];

//テキストが打たれたらacutionを実行
document.addEventListener("input", action)

//入力済み文字                   
const entered = document.getElementById("entered");

//未入力文字
const remained = document.getElementById("remaind");

//テキストボックス内の文字
const inputText = document.getElementById("inputText");

//ゲーム画面
const game = document.getElementById("game");

//メッセージ画面
const result = document.getElementById("result");

//リプレイボタン
const replaybottun = document.getElementById("replaybottun");

//１文字ずつに分解した未入力文字が格納された配列（問題文）
let remainedText = remained.textContent.split("");

//入力済みデータを格納する配列
let enteredText = [];

//ランダムな数
let random;

//問題
let question;

//スコア
let score = 0;

//ミス
let miss = 0;

//リザルト画面　スコア
let scoreText = document.getElementById("scoreText")
let missText = document.getElementById("missText")

//ゲーム画面　スコア
let scoreNow = document.getElementById("scoreNow")
let missNow = document.getElementById("missNow")

//キーが押されたら
document.addEventListener("keydown", pushSpace)

//スタートテキスト
let startText = document.getElementById("startText");

//スペースキーが押されたら
function pushSpace(event) {
    let startText = document.getElementById("startText")
    if (startText.innerText === "スペースキーを押してスタート！") {
        if (event.key == event.shiftKey) {
            setQuestion();
            countdown()
            miss = miss -1;           
        }
    }

}


//問題文を初期化してセットする関数
function setQuestion() {

    //ランダムな数
    random = Math.floor(Math.random() * mList.length);
    
    //問題
    question = mList[random];
    document.getElementById("name").innerText = mList2[random];

    //1度選ばれた配列はリストから消去
    mList.splice(random, 1);
    mList2.splice(random, 1);

    //問題文をリセット
    entered.textContent = "";

    //ランダムな問題文をセット
    remained.textContent = question;

    //テキストボックス内を空にする
    inputText.value = "";

    //１文字ずつに分解した未入力文字が格納された配列をリセット（問題文）
    remainedText = question.split("");

    //入力済みデータを格納する配列をリセット
    enteredText =  [];
}


function action(e) {

    //未入力文字配列の１文字目と入力した文字が一致したら
    if(remainedText[0] === e.data) {
        
        //スコア加算
        score = score + 1;
        console.log("score"+score);

        //スコア表示
        scoreNow.textContent = "スコア : " + score;

       //未入力文字配列の一文字目を消して入力済み文字配列に入れる
       enteredText.push(remainedText[0]);
       remainedText.shift();

       //未入力文字と入力済み文字を連結して表示
       entered.textContent = enteredText.join("");
       remained.textContent = remainedText.join("");
       
       //未入力文字が0になったら問題をセットする
       if(remainedText.length === 0) {
          setQuestion();
       }
    } else {

        //ミス　加算
        miss = miss + 1;

        //ミス表示
        missNow.textContent = "ミス : " + miss;

        //ミスしたら入力されないようにする
        inputText.value = entered.textContent + "";
    } 
}

//タイマー
const timer = document.getElementById('timer');

//初期時間
let TIME = 30;

//1秒ずつカウントダウン
function countdown() {setInterval(function() {
    timer.textContent = '制限時間：' + --TIME + '秒';
   if(TIME <= 0) finish();
   }, 1000)};

//タイマーをとめてでリザルト画面  
function finish() {
   clearInterval(countdown);
   game.classList.add("hidden");
   result.classList.remove("hidden");
   scoreText.textContent = "スコア : " +  score;
   missText.textContent = "ミス : " +  miss;
}

//リプレイボタンを押したとき
replaybottun.addEventListener("click", relode)

//リロード
function relode() {
    window.location.reload();
}
