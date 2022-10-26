module.exports = class ConversationResponse {
  constructor(conversation) {
    this.conversation = conversation
  }
  custom() {
    return {
      _id: this.conversation._id,
      is_room: this.conversation.is_room,
      seen_last_messages: this.conversation.seen_last_messages,
      last_message: this.conversation.last_message ? {
        _id: this.conversation.last_message._id,
        content: this.conversation.last_message.content,
        content_type: this.conversation.last_message.content_type,
        deleted: this.conversation.last_message.deleted,
        createdAt: this.conversation.last_message.createdAt,
      } : null,
      createdAt: this.conversation.createAt,
      updatedAt: this.conversation.updateAt,
    }
  }
}