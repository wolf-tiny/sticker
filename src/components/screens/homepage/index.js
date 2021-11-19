import React, { useState } from 'react';
import NoteBox from '../../includes/noteItem';
import './styles.css';

const StickyApp = () => {

  const [countAll, setCountAll] = useState(0);
  const [arrList, setArrList] = useState([]);
  const [strDetail, setStrDetail] = useState('');
  let arrColor = ['gold', 'pink', 'red', 'gray'];

  const handleAddNote = (e) => {
    setArrList(list => [...list, {
      id: countAll,
      detail: strDetail,
      isView: true,
      type: arrColor[Math.floor(Math.random() * 4)],
      rotationDeg: Math.floor(Math.random())
    }])
    setStrDetail('');
    setCountAll(item => item + 1);
  }

  const handleDelNote = (i) => {
    setArrList(list => list.map((item, idx) => {
      if (item.id === i.id) {
        return {
          isView: false,
          type: item.color,
          rotationDeg: item.rotationDeg,
          strDetail: item.strDetail
        }
      } else {
        return item;
      }
    }))
  }

  const handleColorChangeNote = (index, color) => {
    setArrList(list => list.map((item, idx) => {
      if (idx === index) {
        return {
          isView: true,
          type: color,
          rotationDeg: item.rotationDeg,
          strDetail: item.strDetail
        }
      } else {
        return item;
      }
    }))
  }

  const handleNoteList = () => {
    if (arrList && arrList.length) {
      return arrList.map((noteItem, index) => {
        return <NoteBox
          color={arrColor}
          item={noteItem}
          del={handleDelNote}
          change={handleColorChangeNote}
          key={index.toString()}
          index={index}
        />
      })
    }
  }

  const handleClearAllNotes = (e) => {
    setArrList([]);
  }

  const handleDragOver = (e) => {
  }

  return (
    <div id="stickyArea" onDragOver={handleDragOver}>
      <div className="formArea">
        <form>
          <div className="form-group">
            <textarea
              className="sticky-input"
              placeholder="Take a note..."
              value={strDetail}
              rows="10"
              onChange={e => setStrDetail(e.target.value)} />
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearAllNotes}>
              Clear
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleAddNote}>
              Add
            </button>
          </div>
        </form>
      </div>
      {handleNoteList()}
    </div>
  );
}

export default StickyApp;
