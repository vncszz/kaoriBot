const { TextInputStyle } = require("discord.js")
const { InteractionType } = require('discord.js')
const Discord = require("discord.js")

module.exports = {
    name: "parceria", // Coloque o nome do comando
    description: "Faça uma parceria", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const modal = new Discord.ModalBuilder()
            .setCustomId('partner')
            .setTitle('Parceria')

        const idPartner = new Discord.TextInputBuilder()
            .setCustomId('idPartner')
            .setLabel('Insira somente o ID do representante aqui')

            .setStyle(TextInputStyle.Paragraph)

        const invitePartner = new Discord.TextInputBuilder()
            .setCustomId('invitePartner')
            .setLabel('Insira somente o convite aqui')

            .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(idPartner);
        const secondActionRow = new Discord.ActionRowBuilder().addComponents(invitePartner)

        modal.addComponents(firstActionRow, secondActionRow)
        await interaction.showModal(modal);

        client.on('interactionCreate', async interaction => {
            if (!interaction.isModalSubmit()) return;

            if (interaction.customId === 'partner') {

                const invite = interaction.fields.getTextInputValue('invitePartner')
                const idPartner = interaction.fields.getTextInputValue('idPartner')

                let  canal = interaction.guild.channels.cache.get('1076316523540533309')
                let notificationId = '988493127331508224' 

                interaction.reply({
                    content: `Parceria Enviado com sucesso <:corretoaz:1076576186962026618>`,
                })

                canal.send({content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.username}\`\nPing: <@&${notificationId}>`});
            }
        })
    }
}