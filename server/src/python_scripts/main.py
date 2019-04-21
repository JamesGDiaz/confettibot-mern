import sys
import json
import asyncio
import colorama
import ocr
import handler
import question
from wsmessage import wsMessage
colorama.init(autoreset=True)


def main(argv):
    image = ocr.base64toimage(argv[0])
    myquestion = ocr.runOcr(image)
    # questiondict = json.loads(argv[0])
    # myquestion = question.Question(exito=questiondict['exito'], pregunta=questiondict['pregunta'],
    #                               respuesta1=questiondict['respuesta1'], respuesta2=questiondict['respuesta2'], respuesta3=questiondict['respuesta3'])
    pregunta = wsMessage(type=wsMessage.Type.QUESTION,
                         message=myquestion.pregunta).getJson()
    print(pregunta)
    coro = handler.answer_question(
        myquestion.pregunta, myquestion.respuestas)
    myquestion.posible_respuesta = asyncio.get_event_loop().run_until_complete(coro)
    respuesta = wsMessage(type=wsMessage.Type.ANSWER,
                          message=myquestion.getAnswer()).getJson()
    print(respuesta)


if __name__ == "__main__":
    main(sys.argv[1:])
