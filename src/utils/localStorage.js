//localStorage过期时间设置
export function setExpire(key, value, expire){
    let obj = {
        data: value,
        time: Date.now(), //当前时间
        expire: expire //有效期
    };
    localStorage.setItem(key, JSON.stringify(obj));
}

//获取localStorage的值
export function getExpire (key){
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    //取值时间-存值时间 > 有效时间：说明已经过期
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}
