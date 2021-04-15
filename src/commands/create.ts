import { Commands } from '@/interfaces';
import axios from 'axios';

const command: Commands = {
    name: 'create',
    description: 'Crea un canal.',
    execute(message, args, client) {
        const dataArray = args.toString().split('|');
        const data = {
            title: dataArray[0].trim(),
            desc: dataArray[1].trim(),
        }
        axios.get(`http://localhost:16003/guild/${message.guild.id}`).then((resp) => {
            message.guild.channels.create(data.title, {
                type: "text"
            }).then(channel => {
                if (resp.data.data.category) {
                    channel.setParent(resp.data.data.category.toString());
                }
                channel.setTopic(data.desc);
            })
        })
    },
};

module.exports = command;
