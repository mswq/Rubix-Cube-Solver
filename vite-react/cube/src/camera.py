import cv2

camera = cv2.VideoCapture(0)

def draw(frame):
    frame = cv2.flip(frame, 1)
    cv2.rectangle(frame, (120, 120), (240, 240), (0, 0, 0), 4)
    cv2.line(frame, (120, 160), (240, 160), (0, 0, 0), 4)
    cv2.line(frame, (120, 200), (240, 200), (0, 0, 0), 4)
    cv2.line(frame, (160, 120), (160, 240), (0, 0, 0), 4)
    cv2.line(frame, (200, 120), (200, 240), (0, 0, 0), 4)
    return frame

def get_hex(frame):
    frame = cv2.flip(frame, 1)
    rois = [(140, 140), (140, 180), (140, 220), (180, 140), (180, 180), (180, 220), (220, 140), (220, 180), (220, 220)]
    face = []
    for x, y in rois:
        b, g, r = frame[x, y]
        hex_color = f"#{r:02x}{g:02x}{b:02x}" 
        face.append(hex_color)  
    return face

def get_cube():
    cube = []
    print ('scanning cube')
    for i in range(6):
        print("capturing face")
        while True:
            ret, frame = camera.read()
            grid_frame = draw(frame)
            cv2.imshow("testing", grid_frame)
            if cv2.waitKey(1) & 0xFF == ord('p'):
                face = get_hex(frame)
                print (face)
                cube.append(face)
                break
    return cube

def run():
    while camera.isOpened():
        ret, frame = camera.read()
        grid_frame = draw(frame)
        cv2.imshow("testing", grid_frame)

        if cv2.waitKey(1) & 0xFF == ord('c'):
            print ("c pressed")
            cube = get_cube()
            print (cube)

        elif cv2.waitKey(1) & 0xFF == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()