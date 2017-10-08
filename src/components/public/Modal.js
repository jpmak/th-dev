import React from 'react';
import ReactModal from 'react-modal';


const customStyles = {
    content: {
       width:'80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        opacity: '1',
        color: '#fff',
        padding: '0px',
    border:'0px',
        borderRadius: '2%',
     zIndex: '999'
    },
    overlay: {
    	  position:' fixed',
    	     top: '0',
    left: '0',
    right: '0',
    bottom: '0',
   backgroundColor   : 'rgba(0, 0, 0, 0.6)',
        zIndex: '999'
    }
};
const customStyles2 = {
    content: {

        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
          backgroundColor   : 'rgba(0, 0, 0, 0.6)',
        opacity: '1',
        color: '#fff',
        padding: '0px',
    border:'0px',
    borderRadius: '2%',
     zIndex: '999'
    },
    overlay: {
    	  position:' fixed',
    	     top: '0',
    left: '0',
    right: '0',
    bottom: '0',
   backgroundColor   : 'none',
        zIndex: '999'
    }
};

class Modal extends React.Component {
	    constructor(props) {
	    	  super(props);
	    this.state = {
         showModal: false,
         showModal2: false,
         showModal3: false,

            modalIsOpen: false,
            text: '',
            text2: '',
            text3: '加载中',

        };
       this.iconTips = {
0:'modalError',
1:'modalOk',
2:'',
       }
            this.handleOpenModal = this.handleOpenModal.bind(this);//chooseBox
            this.handleOpenModal2 = this.handleOpenModal2.bind(this);//tipBox
            this.handleOpenModal3 = this.handleOpenModal3.bind(this);//loadingBox


    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    this.handleCloseModal3 = this.handleCloseModal3.bind(this);

	    }
	        closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
        isurePay() {
        this.setState({
            showModal: true,
            text: '你确认已收到货，并要完成订单'
        });
    }
    setText(e){
    this.setState({ text: e });
    }
        setText2(e){
    this.setState({ text2: e });
    }
      handleOpenModal () {
       	document.documentElement.style.overflowY = 'hidden'
    this.setState({ showModal: true });
  }
        handleOpenModal2 () {
    this.setState({ showModal2: true },()=>{
    setTimeout((this.handleCloseModal2),800)
    });
  }
      handleOpenModal3 () {
       	document.documentElement.style.overflowY = 'hidden'
    this.setState({ showModal3: true });
  }
  handleCloseModal () {
       	document.documentElement.style.overflowY = 'auto'
    this.setState({ showModal: false });
  }
    handleCloseModal2 () {
    this.setState({ showModal2: false });
  }
      handleCloseModal3 () {
    this.setState({ showModal3: false });
  }
  ModalCallBack(){
  	this.props.ModalCallBack()
  }
	render() {
		return (
        <div>
		<ReactModal   onRequestClose={this.handleCloseModal}    style={customStyles} 
           isOpen={this.state.showModal} contentLabel="MakeSure Modal ">
         <p className='modalText'>{this.state.text}</p>
         <a className='modalBtn' onClick={this.handleCloseModal}>取消</a>
         <a className='modalBtn confirm' onClick={this.ModalCallBack.bind(this)}>确定</a>
        </ReactModal>
        <ReactModal style={customStyles2}  contentLabel="BoxState Modal " isOpen={this.state.showModal2}>
         <p className='modalText2'><i className={this.iconTips[this.props.icon]}></i>{this.state.text2}</p>
 
        </ReactModal>

                <ReactModal style={customStyles2}  contentLabel="loading Modal " isOpen={this.state.showModal3}>
         <p className='modalText2'><i className='modalLoading'></i>{this.state.text3}</p>
 
        </ReactModal>

        </div>
		)


	}
}

export default Modal;