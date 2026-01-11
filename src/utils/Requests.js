class Requests {
    constructor(_url){
        this.baseUrl = _url
        this.internalSecret = process.env.INTERNAL_SECRET || "internal_secret"
    }

    request(url, methodObj, isData = true){
        return new Promise(async (resolve, reject) => {
            try{
                const response = await fetch(`${this.baseUrl}${url}`, methodObj);

                if (!response.ok) {
                    reject('Network response was not ok');
                }else{
                    if(isData){
                        const data = await response.json();
                        resolve(data)
                    }else resolve(response)
                }
            }catch(err){
                reject(err)
            }
        })
    }

    async get(url, isData = true){
        return new Promise(async (resolve, reject) => {
            try{
                const responseData = await this.request(url, {
                    method:'GET',
                    headers:{
                        "x-internal-secret": this.internalSecret,
                    }
                }, isData)

                resolve(responseData)
            }catch(err){
                reject(err)
            }
        })
    }

    async post(url, body){
        return new Promise(async (resolve, reject) => {
            try{
                const responseData = await this.request(url, {
                    method:'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "x-internal-secret": this.internalSecret,
                    },
                    body:body
                })

                resolve(responseData)
            }catch(err){
                reject(err)
            }
        })
    }

    async put(url, body){
        return new Promise(async (resolve, reject) => {
            try{
                const responseData = await this.request(url, {
                    method:'PUT',
                    headers:{
                        "Content-Type": "application/json",
                        "x-internal-secret": this.internalSecret,
                    },
                    body:body
                })

                resolve(responseData)
            }catch(err){
                reject(err)
            }
        })
    }

    async delete(url){
        return new Promise(async (resolve, reject) => {
            try{
                const responseData = await this.request(url, {
                    method:'DELETE',
                    headers:{
                        "x-internal-secret": this.internalSecret,
                    }
                }, false)

                resolve(responseData)
            }catch(err){
                reject(err)
            }
        })
    }
}

module.exports = Requests