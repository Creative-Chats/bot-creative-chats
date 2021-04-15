import { Commands } from '@/interfaces';
import axios from 'axios';

const command: Commands = {
    name: 'log',
    description: 'Asigna un canal para enviar los registros del bot.',
    execute(message, args, client) {
        let id;
        if (args[0]) {
            id = args[0].replace(/\D/g,'');
        }
        if (id) {
            client.channels.fetch(id).then( res => {
                if (res.type === 'text'){
                    const data = {
                        log: id.toString()
                    }
                    axios.put(`http://localhost:16003/guild/setLog/${message.guild.id}`, data).then( () => {
                        return message.channel.send(`Genial, ahora los registros del bot se enviarán a <#${id}>`);
                    }).catch(err => console.log(err.response.data));
                } else {
                    return message.channel.send(`Vaya... El bot no reconoce ese canal, ¿Estás seguro que es un canal de texto?`);
                }

            }).catch( err => {
                return message.channel.send(`Vale. Eso no es un canal de texto, inténtalo de nuevo.`);
            });
        } else {
            return message.channel.send(`¡Debes enviar un canal de texto!`);
        }
    },
};

module.exports = command;
