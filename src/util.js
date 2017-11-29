export function getRedirectPach({type, avatar}) {
    // 根据用户信息去判断跳转的地址 user.type  /boss /genius user.avatar /bossinfo /geniusinfo
    console.log(arguments);
    let url = (type === 'BOSS')
        ? '/boss'
        : '/genius';
    if (!avatar) {
        url += 'info'
    }
    return url;
}