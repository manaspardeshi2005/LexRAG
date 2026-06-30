from collections import defaultdict

WINDOW_SIZE = 6

conversation_memory = defaultdict(list)


def add_message(conversation_id, role, content):
    """
    Add a message to a conversation.
    """

    conversation_memory[conversation_id].append({
        "role": role,
        "content": content
    })

    # Keep only the latest WINDOW_SIZE messages
    conversation_memory[conversation_id] = conversation_memory[
        conversation_id
    ][-WINDOW_SIZE:]


def get_history(conversation_id):
    """
    Return conversation history as formatted text.
    """

    history = conversation_memory.get(conversation_id, [])

    if not history:
        return ""

    formatted = ""

    for msg in history:

        formatted += f"{msg['role'].capitalize()}: {msg['content']}\n\n"

    return formatted


def clear_history(conversation_id):

    conversation_memory.pop(conversation_id, None)