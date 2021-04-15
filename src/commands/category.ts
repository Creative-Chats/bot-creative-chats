import { Commands } from '@/interfaces';
import axios from 'axios';

const command: Commands = {
    name: 'category',
    description: 'Asigna una categoría donde se crearán los canales.',
    execute(message, args, client) {
        let id = args[0];
        if (id) {
            client.channels.fetch(id).then( res => {
                if (res.type === 'category') {
                    const data = {
                        category: id.toString()
                    }
                    axios.put(`http://localhost:16003/guild/setCategory/${message.guild.id}`, data).then( () => {
                        return message.channel.send(`La categoría donde se crearán los canales ha cambiado.`);
                    }).catch(err => console.log(err.response.data));
                } else {
                    return message.channel.send(`Vaya... El bot no reconoce esa categoría. Asegúrate de estar enviando el ID correcto.`);
                }
            }).catch( err => {
                return message.channel.send(`Vale. Has enviado un ID inválido, inténtalo de nuevo.`);
            });
        } else {
            return message.channel.send(`¡Debes enviar un ID de una categoría!`);
        }
    },
};

module.exports = command;
