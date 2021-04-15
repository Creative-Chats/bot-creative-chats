import { MessageEmbed, User } from 'discord.js';

class Automations {

    public sendWelcomeMsg(owner: User): void {

        const embed = new MessageEmbed()
            .setColor('#288616')
            .setTitle('¡Hola!')
            .setDescription('Acá tienes una guía rápida para el uso del bot:')
            .addFields(
                { name: '¿De qué va el bot?', value: 'Es muy simple, crea canales temáticos con un tiempo límite,' +
                        ' extiéndelos a tu gusto y cuando el tiempo se cumpla, el canal sará borrado' +
                        ' automáticamente. Recuerda que solo los administradores pueden hacer uso de sus funciones.' },
                { name: '¿Por dónde empezar?', value: 'El bot por defecto creará los canales en la primera categoría' +
                        ' que exista, así que es fundamental que asignes una categoría donde se crearán los canales.' +
                        ' Puedes hacerlo con el comando `cc!asign <id de la categoría>`. El ID lo puedes conseguir' +
                        ' haciendo click derecho en la categoría que desees.' },
                { name: '¿Cómo puedo crear canales?', value: 'Es bastante simple: `cc!create <título> |' +
                        ' <descripción>`, y ya! La descripción es opcional, pero el título sí es necesario. Para' +
                        ' separar el título de la descripción, debes usar `|` como separador.' },
            )
            .addField('¿Y eso es todo?', 'Por ahora sí, lo fundamental. Con el comando `cc!help` podrás obtener más' +
                ' información', true)
            .setTimestamp()
            .setFooter('Gracias por el uso • Hecho con ♥ por Aquino', 'https://i.imgur.com/wSTFkRM.png');

        owner.send(embed);

    }

}

export default new Automations();
