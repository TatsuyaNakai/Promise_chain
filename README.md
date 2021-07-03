## 非同期処理のチェーンについて教えてもらいたいです。

next.jsの途中でasync, awaitの非同期処理にあたりました。
これを機に非同期処理の理解を深めようと思いPromiseの非同期処理のチェーンから調べていたのですが、こちらの15, 16行目の処理がなんともいえず、、理解というか、どういった動きをしているのか気になったので教えてもらいたいです。

### 【疑問】
- return にPromiseのインスタンスを返さないとチェーンが切れてしまうのは理解できました。しかし、チェーンが切れた際に再度チェーンを繋いだ時の結果が理解できませんでした。
→Promiseの内部は同期処理で、then,catch,finallyは非同期処理を行うと認識しています。

### 【調べたサイト】
- [Udemy](https://www.udemy.com/course/javascript-essence/learn/lecture/20025238#notes)
- [イメージで伝われ！図解JSの非同期処理](https://memowomome.hatenablog.com/entry/js_async_viz#fn:2)

### 【予想】
- thenメソッドの中でsleepは同期的に行われるが、その中のsetTimeoutが非同期処理なので、メインスレッドから切り離されてreturn valの方が処理が早く進み、結果として次のthenメソッドが呼ばれる結果となり、valが+1されるわけでもなく次のthenメソッドが呼ばれた。

Promiseを理解する上ではだいぶ脱線していますが、気になったので、教えてもらいたいです！