import React, { Fragment } from 'react';

export function PostIt({postit, eliminarPostIt}){
	const {id, title, desc, chk} = postit;
	const colorPostIt = (chk === false)?"card card-custom mt-5 me-5 card-normal":"card card-custom mt-5 me-5 card-important";
	const fnEliminarPostIt = () => {
		eliminarPostIt(id);
	}

    return (
        <Fragment>
			<div className={colorPostIt}>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<button className="btn card-close" onClick={fnEliminarPostIt}><i className="bi bi-x-circle"></i></button>
					<p className="card-text-custom">{desc}</p>
				</div>
			</div>
        </Fragment>
    );
}