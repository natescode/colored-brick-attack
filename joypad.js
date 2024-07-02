class JoyPad {
  constructor(cbs) {
    this.calls = cbs;
    this.blobsContainer = document.querySelectorAll(".blobs");
    this.blobs = document.querySelectorAll(".blob");

    window.addEventListener("gamepadconnected", (event) => {
      this.stateCheck();
    });
  }

  stateCheck() {
    window.requestAnimationFrame(() => {
      this.gamepads = navigator.getGamepads();
      this.gamepad = this.gamepads[0];
      this.padStatus();
      this.stateCheck();
    });
  }

  padStatus() {
    this.gamepad.buttons.forEach((button, index) => {
      if (this.blobs[index]) {
        this.blobs[index].classList.remove("pressed");
        if (button.pressed) {
          this.blobs[index].classList.add("pressed");
          console.log("button ID " + index);
          this.calls.forEach((call) => {
            if (call.index == index && !call.isDone) {
              call.fn();
              call.isDone = true;
            }
          });
        }
      }
    });

    const x = this.gamepad.axes[0];
    const y = this.gamepad.axes[1];

    // this.blobsContainer[0].style.transform = `translate(${x}em, ${y}em)`;
  }
}

let cbs = [
  {
    index: 0,
    fn: function () {
      console.log("it works!");
    },
    isDone: false,
  },
];

new JoyPad(cbs);
