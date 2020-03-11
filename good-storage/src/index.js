/**
 * 本地存储实现,封装localStorage和sessionStorage
 */

 let store = {
   version: '1.1.0',
   storage: window.localStorage,
   session: {
    storage: window.sessionStorage
   }
 };

 let api = {
   set (key, value) {
     if (this.disabled) {
       return;
     }
     if (value === undefined) {
       this.remove(key);
     }
     this.storage.setItem(key, value);
     return value;
   },
   get(key, def) {
     if (this.disabled) {
       return def;
     }
     let val = deserialize(this.storage.getItem(key));
     return (val === undefined ? def : val);
   },
   has (key) {
     return this.get(key) !== undefined;
   },
  remove (key) {
    if (this.disabled) {
      return;
    }
    return this.storage.removeItem(key);
   },
   clear () {
     if (this.disabled) {
       return;
     }
     this.storage.clear();
   },
   getAll () {
     if (this.disabled) {
       return;
     }
     let ret = {};
     this.forEach((key, val) => {
       ret[key] = val;
     });
   },
   forEach (callback) {
     if (this.disabled) {
       return;
     }
     for (let i = 0; i < this.storage.length; i++) {
       let key = this.storage.key(i);
       callback(key, this.get(key));
     }
   }
 };

 Object.assign(store, api);
 Object.assign(store.session, api);

 function serialize (value) {
   return JSON.stringify(value);
 }

 function deserialize (value) {
   if (typeof value !== 'string') {
     return undefined;
   }
   try {
     return JSON.parse(value);
   } catch (error) {
     return value || undefined;
   }
 }

 // 判断store.set是否能够使用，从而判断是否进行storage的使用
 try {
   let key = '__storejs__';
   store.set(key, key);
   if (store.get(key) !== key) {
     this.disabled = true;
   }
   this.disabled = false;
 } catch (error) {
   this.disabled = true;
 }

 export default store;
