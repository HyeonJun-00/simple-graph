const a = (() => {
    let count = -1;
    return () => ++count;
})();

class Greaph {
    constructor(index) {
        this.index = index;
        this.row = 0;
        this.column = 0;
        this.canvasSize = 500;
        this.columnNameArray = [];
    }

    createContentsBox() {
        const addButton = $("#contents_add_button");

        addButton.before(
        `<article class="contents_box">
            <div class="matrix_box">
                <div class="row_column_box">
                    <div class="row_box">
                        <p>답변</p>
                        <input type="number" placeholder="">
                    </div>
                    <div class="column_box">
                        <p>그래프</p>
                        <input type="number" placeholder="">
                    </div>
                    <div class="button_box">
                        <p>표 생성</p>
                        <button class="create_button">생성</button>
                    </div>
                </div>
                <div class="matrix">
                </div>
                <button> 적용 </button>
            </div>
            <div class="color_box"></div>
            <div class="graph_box">
                <canvas class="canvas"></canvas>
            </div>
        </article>`
        );

        $($(".create_button")[this.index]).on("click", () => {
            this.createMatrix();
        });
        $($(".matrix_box > button")[this.index]).on("click", () => {
            this.createGreph();
        });
        $($(".row_box > input")[this.index]).change((v) => {
            this.row = $($(".row_box > input")[this.index]).val();
        });
        $($(".column_box > input")[this.index]).change((v) => {
            this.column = $($(".column_box > input")[this.index]).val();
        });


    }

    createMatrix() {
        const matrix = $($(".matrix")[this.index]);
        let matrixString = "";

        for (let i = 0; i <= this.column; i++) {
            matrixString += "<div>";

            for (let j = 0; j <= this.row; j++) {
                if (j == 0) {
                    matrixString += `<p>${i == 0 ? "" : i + "번"}</p>`;
                } else {
                    if (i == 0) {
                        matrixString += "<input type='text' placeholder='답변'/>";
                    } else {
                        matrixString += "<input type='number'/>";
                    }
                }
            }
            matrixString += "</div>";
        }
        matrix.html(matrixString);
        for (let i = 0; i < this.row; i++) {
            $($(matrix.children("div")[0]).children("input")[i]).change((v) => {
                this.columnNameArray[i] = $($(matrix.children("div")[0]).children("input")[i]).val();
            });
        }

    }

    createGreph() {
        const canvas = $('.canvas')[this.index];
        const ct = canvas.getContext('2d');
        const colorArray = ['#00ff00', '#0000ff', '#ff0000', '#ffdd66', '#dd66ff', "#ff00ff", "#00ffff"];
        const matrixArray = $($(".matrix")[this.index]).children("div");
        
        canvas.width = this.canvasSize;
        canvas.height = this.canvasSize;

        let center_x = this.canvasSize / 2;
        let center_y = this.canvasSize / 2;

        let start = 0;
        let end = 0;

        if (canvas.getContext) {
            ct.clearRect(0, 0, this.canvasSize, this.canvasSize);
            ct.font = 'bold 15px/15px Sans-Serif';
            const inputDataArray = [];
            let sumNumbers = 0;

            for(let i = 1; i < matrixArray.length; i++) {
                const input = $(matrixArray[i]).children("input");

                for (let j = 0; j < this.columnNameArray.length; j++) {
                    let inputData = Number($(input[j]).val());
                    
                    sumNumbers += inputData;
                    inputDataArray.push(inputData);
                }
            }

            for (let i = 0; i < this.columnNameArray.length; i++) {
                end += inputDataArray[i] / sumNumbers  * 360;

                ct.fillStyle = colorArray[i];
                ct.beginPath();
                ct.moveTo(center_x, center_y);
                ct.arc(center_x, center_y, center_y - 50, start * Math.PI / 180, end * Math.PI / 180, false);

                ct.closePath();
                ct.fill();

                ct.fillRect(10, this.canvasSize - 70 - 16 * i, 10, 10);

                ct.fillStyle = '#000';
                ct.fillText((inputDataArray[i] / sumNumbers  * 100).toFixed(2) + "%", center_x - 12 + 160 * Math.cos((start + (end - start)/2) * Math.PI / 180), center_y + 6 + 160 * Math.sin((start + (end - start)/2) * Math.PI / 180));
                ct.fillText(this.columnNameArray[i], 25, this.canvasSize - 60 - 16 * i);
                console.log(end, start);
                
                start = end;

            }
        }
    }
}

(() => {
    const greaph = [];
    const addButton = $("#contents_add_button");

    addButton.on("click", () => {
        const newIndex = a();

        greaph[newIndex] = new Greaph(newIndex);
        greaph[newIndex].createContentsBox();
    });
})();