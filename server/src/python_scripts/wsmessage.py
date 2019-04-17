import json


class wsMessage:
    class Type:
        INFO = "INFO"
        QUESTION = "QUESTION"
        ANSWER = "ANSWER"
        ERROR = "ERROR"

    def getJson(self):
        return json.dumps({'type': self.type, 'message': self.message})

    def __init__(self, type='null', message='null'):
        super()
        self.type = type
        self.message = message
