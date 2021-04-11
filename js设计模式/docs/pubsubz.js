/**
 * https://github.com/addyosmani/pubsubz/blob/master/pubsubz.js
 */
(function(){
    let topics = {},// 订阅者容器
    subUid = -1, // 订阅者编号
    pubsubz = {}; // 模式代码
    // 发布
    pubsubz.publish = function(topic,args){
        arguments
        if(!topics[topic]){
            return false;
        }
        setTimeout(()=>{
            let subscribers = topics[topic],
                len = subscribers?subscribers.length:0;
            while(len--){
                subscribers[len].func(topic,args);
                
            }
        },0)
        return true;
    }
    // 订阅
    pubsubz.subscribe = function(topic,func){
        if(!topics[topic]){
            topics[topic]=[];
        }

        let token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func:func
        })
        return token;
    }

    // 卸载订阅
    pubsubz.unSubscribe = function(token){
        for(let m in topics){
            let topic = topics[m];
            if(topic){
                for(let i = 0,j=topic.length;i<j;i++){
                    if(topic[i].token ===  token){
                        topics[m] = topic.splice(i,1)
                        return token;
                    }
                }
            }
        }
    }
})()

window.Array.prototype