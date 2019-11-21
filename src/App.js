import React from 'react';

class App extends React.Component {

	state = {
		mode: 'ADD',
		first_name: '',
		last_name: '',
		persons: []
	}

	save = () => {

		if(this.state.mode === 'ADD') {
			console.log(this.state.persons);
			let genId = 0;
			if (this.state.persons.length === 0){
				genId = 1;
			} else {
				genId = this.state.persons[this.state.persons.length-1].id +1;
				console.log('genId', genId);
			}
			
			this.setState({
				persons: [
					...this.state.persons, {
					id: genId,
					first_name: this.state.first_name,
					last_name: this.state.last_name
					}
				],
				first_name: '',
				last_name: ''
			});
		} else {
			const { id, persons } = this.state;
			console.log(id);
			const index = persons.findIndex(person => person.id === id);
			console.log('index', index);
			const personsStart = persons.slice(0, index);
			console.log('start', personsStart);
			const personsEnd = persons.slice(index + 1);
			console.log('end', personsEnd);

			const updatedPersons = [
				...personsStart,
				{
					id: this.state.id,
					first_name: this.state.first_name,
					last_name: this.state.last_name
				},
				...personsEnd
			];

			console.log('update',updatedPersons);

			this.setState({
				persons: updatedPersons,
				id: '',
				first_name: '',
				last_name: '',
				mode: 'ADD'
			});

		}
		
	}

	delete = (id) => {
		
		const { persons } = this.state;
		console.log(id);
		const index = persons.findIndex(person => person.id === id);
		console.log('index', index);

		this.setState({
			persons: this.state.persons.filter((_, person) => person !== index)
		});
	}

	edit = (id) => {
		const { persons } = this.state;
		console.log(id);
		const index = persons.findIndex(person => person.id === id);
		console.log('index', index);

		const edit = this.state.persons.filter((_, person) => person === index);

		this.setState({
			id: edit[0].id,
			first_name: edit[0].first_name,
			last_name: edit[0].last_name,
			mode: 'EDIT'
		});

	}

	render(){
		console.log(this.state.mode);

		return (
			<div className="">
				<div className='container-fluid text-center bg-dark text-white p-4'>
					<h1>React Sample App</h1>
				</div>
				<div className='container'>
				<div class="row p-3">
					<div class="col-12 col-sm-5 p-2 p-sm-1">
						<input 	className="form-control" 
								placeholder="First name" 
								onChange={e => this.setState({ first_name: e.target.value }) } 
								value={this.state.first_name} 
								type='text'
								name="fname" 
						/>
					</div>
					<div class="col-12 col-sm-5 p-2 p-sm-1">
						<input 	type="text" 
								className="form-control" 
								placeholder="Last name"
								onChange={e => this.setState({ last_name: e.target.value })} 
								value={this.state.last_name} 
								name='lname'
						/>
					</div>
					<div class="col-1 p-2 p-sm-1">
						<button className='btn btn-success' onClick={()=> this.save()}>Submit</button>
					</div>
				</div>
				</div>
				
				<div className='container p-3'>
					<table className='table table-hover'>
						<thead className='thead-light'>
							<tr>
								<th>ID</th>
								<th>Firstname</th>
								<th>Lastname</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
							<tbody>
							{this.state.persons.map(person => (
								<tr key={person.id}>
									<td>{person.id}</td>
									<td>{person.first_name}</td>
									<td>{person.last_name}</td>
									<td><button className='btn btn-danger' onClick={()=> this.delete(person.id)}><i className="far fa-trash-alt"></i></button></td>
									<td><button className='btn btn-primary' onClick={()=> this.edit(person.id)}><i className="far fa-edit"></i></button></td>
								</tr>
							))}
							</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default App;
