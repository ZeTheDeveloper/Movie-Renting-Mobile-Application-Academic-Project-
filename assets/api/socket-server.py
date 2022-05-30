from flask_socketio import SocketIO, emit
from datetime import datetime
import json

#create server using socket
socketio = SocketIO(app)

@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
    print('Connected to /chat')


@socketio.on('client_connected', namespace='/chat')
def handle_client_connected_chat(json):
    print('Connection Status: {} User: {}'.format(json['connected'], json['username']))


@socketio.on('message_sent', namespace='/chat')
def handle_client_send_chat(json_data):
    sender = json_data['sender']
    message = json_data['message']

    data= {
        'timestamp': str(datetime.now()),
        'sender': sender,
        'message': message,
    }

    emit('message_broadcast', json.dumps(data), broadcast=True)
