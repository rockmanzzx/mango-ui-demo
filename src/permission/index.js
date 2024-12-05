import store from "@/store";

export function hasPermisson(perms) {
    let hasPermission = false
    let permissions = store.state.user.perms
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i] === perms) {
            hasPermission = true
            break
        }
    }
    return hasPermission    
}