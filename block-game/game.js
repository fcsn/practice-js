'use strict';

const Block = class{
    constructor(type){
        this._type = type;
    }
    get image(){
        return `url('img/${this._type}.png')`;
    }
    get type(){
        return this._type;
    }
}

Block.GET = (type = parseInt(Math.random() * 5))=>new Block(type);

const Game = ( () => {
    const column = 8, row = 8, blockSize = 80;
    const data=[];
    let table;
    let startBlock, currBlock, isDown;
    const selected = [];

    const getBlock = (x, y) => {
        const { top: T, left: L } = table.getBoundingClientRect();
        if(x < L || x > (L + blockSize * row) || y < T || y > (T + blockSize * column) return null;
        return data[parseInt((y -T) / blockSize)][parseInt((x -L) / blockSize)];
    };

    const isNext = curr => {
        let r0, c0, r1, c1, cnt = 0;
        data.some((row, i) => {
            let j;
            if((j = row.indexOf(currBlock)) != -1) r0 = i, c0 = j, cnt++;
            if((j = row.indexOf(curr)) != -1) r1 = i, c1 = j, cnt++;
            return cnt == 2;
        });
        return curr != currBlock && Math.abs(r0 -r1) == 1 || Math.abs(c0 -c1) == 1;
    };

    const reset =_=>{
        startBlock = currBlock = null;
        selected.length = 0;
        isDown = false;
        render();
    };

    const remove =_=> {
        data.forEach(r => { // 데이터 삭제
            selected.forEach(v => {
               let i;
               if((i = r.indexOf(v)) != -1) r[i] = null;
            });
        });
        render();
        setTimeout(drop, 300);
    };

    const drop =_=>{
        let isNext = false;
        for(let j = 0; j < column; j++) {
            for(let i = row -1; i > -1; i--) {
                if(!data[i][j] && i) {
                    let k = i, isEmpty = true;
                    while(k--) if(data[k][j]) {
                        isEmpty = false;
                        break;
                    }
                    if(isEmpty) break;
                    isNext = true;
                    while(i--) {
                        data[i + 1][j] = data[i][j];
                        data[i][j]=null;
                    }
                    break;
                }
            }
        }
        render();
        isNext ? setTimeout(drop, 300) :readyToFill();
    };

    const fills = [];
    let fillCnt = 0;
    const readyToFill =_=> {
        fills.length = 0;
        data.some (row => {
            if (row.indexOf(null) == -1) return true;
            const r = [...row].fill(null);
            fills.push(r);
            row.forEach((v, i) => !v && (r[i] = Block.GET()));
        });
        fillCnt = 0;
        setTimeout(fill, 300);
    }

    const fill =_=>{
        if(fillCnt > fills.length) {
            isDown = false;
            return;
        }
        for(let i = 0; i < fillCnt; i++) {
            fills[fills.length -i -1].forEach((v, j) => {
                if(v) data[fillCnt -i -1][j] = v;
            });
        }
        fillCnt++;
        render();
        setTimeout(fill, 300);
    };

    const down = ({ pageX: x, pageY: y }) => {
        if(isDown) return;
        const curr = getBlock(x, y);
        if(!curr) return;
        isDown = true;
        selected.length=0;
        selected[0] = startBlock = currBlock = curr;
        render();
    };

    const move =({ pageX: x, pageY: y }) => {
        if(!isDown) return;
        const curr = getBlock(x, y);
        if(!curr || curr.type != startBlock.type || !isNext(curr)) return;
        if(selected.indexOf(curr) == -1) selected.push(curr);
        else if(selected[selected.length -2] == curr) selected.pop();
        currBlock = curr;
        render();
    };

    const up =_=> selected.length > 2 ? remove(): reset();

    const el = tag => document.createElement(tag)

    const render =_=> {
        table.innerHTML = '';
        data.forEach(row=>table.appendChild(row.reduce((tr, block)=>{
            tr.appendChild(el('td')).style.cssText = `
            ${block ? `background:${block.image};` : ''}
            width:${blockSize}px;
            height:${blockSize}px;
            cursor:pointer`;
            return tr;
        }, el('tr'))));
    };

    return tid => {
        table =document.querySelector(tid);
        for (let i = 0; i < row; i++) {
            const r = [];
            data.push(r);
            for (let j = 0; j < column; j++) r[j] = Block.GET();
        }
        table.addEventListener('mousedown', down);
        table.addEventListener('mouseup', up);
        table.addEventListener('mouseleave', up);
        table.addEventListener('mousemove', move);
        render();
    }
})();
Game('#stage');
