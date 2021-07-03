const sleep=(val)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(val++);
            resolve(val);
        }, 1000);
    });
};

sleep(0).then((val)=>{      //sleep(0)は、レンダリングから1秒後に0を表示する
    return sleep(val);      //非同期の処理(setTimeout)の完了を待って、sleep(1)を実行。1秒後に1を表示して、次のthenを呼ぶ。
}).then((val)=>{
    return sleep(val);      //非同期の処理の完了を待って、sleep(2)を実行。1秒後に2を表示して、次のthenを呼ぶ。
}).then((val=>{
    sleep(val);             //非同期の処理の完了を待って、sleep(3)を実行。1秒後に3を表示して、次のthenを呼ぶ。
    return val;
})).then((val)=>{
    return sleep(val);      //【予想：非同期の処理の完了を待って、sleep(4)を実行。1秒後に4を表示する。】//【結果：15行目のthenメソッドと同じタイミングで同じ値を出力してる。】
}).then((val)=>{
    return sleep(val);       //それ以降は何事もなかったみたいにすすむ
}).then((val)=>{
    return sleep(val);
})

// 15行目と18行目が同じタイミング、同じ値になってる。
// 14行目のthenは自分がvalの値を1秒後に出したこと（15行目の処理）で仕事を終えてる？
// でも15行目でおそらく更新したであろうvalを返してる。valが+1されててもおかしくないはず、、（thenの中でsetTimeoutは非同期、return valは同期的にすぐに実行されたか？）
// 16行目のreturn valだけが先に進んで15行目とほぼ同じタイミングで17行目のthenメソッドが発火したか。

// Promiseの内部は同期処理で、thenメソッドの中は非同期処理だと習っていたのですが、違う？
// thenメソッドの一つ一つの中では同期的な処理が行われてるのか。