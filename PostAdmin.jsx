import React, {Fragment, useState, useRef, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import { PostIt } from './PostIt';

const KEY = "postitlist-postit";

export function PostAdmin(){
	
	const [postits, setPostIt] =useState([]);

	const titleRef = useRef();
	const descRef = useRef();
	const chkRef = useRef();

	useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setPostIt(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(postits));
    }, [postits]);

	const agregarPostIt = () => {
		const title = titleRef.current.value;
		const desc = descRef.current.value;
		const chk = chkRef.current.checked;

		if (desc === ''){
			alert("Campos descripción obligatorio");
			return;
		}

		setPostIt((prevPostIt) =>{
			const newPostIts = {
				id: uuid(),
				title: title,
				desc: desc,
				chk: chk
			}
			return [...prevPostIt, newPostIts];
		});
		titleRef.current.value = null;
		descRef.current.value = null;
		chkRef.current.checked = false;
	}

	const eliminarPostIt = (id) => {
		const newPostIts = [...postits];
		const postitIndex =newPostIts.findIndex((postit) => postit.id === id);
		if (postitIndex > -1) {
			newPostIts.splice(postitIndex, 1);
		}
		setPostIt(newPostIts);
	}

	return (
		<Fragment>
			<h1 className='ms-5'>Post It Simulator!</h1>
			<div className="row ms-5">
				<div className="col">
					<input className="form-control" placeholder="Título" ref={titleRef}></input>
				</div>
				<div className="col">
					<input className="form-control" placeholder="Descripción" ref={descRef}></input>
				</div>
				<div className="col check-color">
					<input className="form-check-input me-2" type="checkbox" ref={chkRef}></input>Importante
				</div>
				<div className="col">
					<button className="btn btn-dark ms-2" onClick={agregarPostIt}>AGREGAR</button>
				</div>
			</div>
			<div className="row ms-5">
				{postits.map((postit) =>( 
					<PostIt postit={postit} key={postit.id} eliminarPostIt={eliminarPostIt}/>
				))}
				
			</div>
		</Fragment>
	);
}