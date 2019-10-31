import PubSub from 'pubsub-js';

export default class TratadorErros {

    publicaErro(objetoErros){
        for(let i = 0;i < objetoErros.errors.length;i++){
            let erro = objetoErros.errors[i];
            PubSub.publish("erro-validacao", erro);
        }
    }
}