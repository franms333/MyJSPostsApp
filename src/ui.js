class UI{
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.body = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSumbit = document.querySelector('.post-submit');
        this.forState = document.querySelector('add');
    }

    showPost(posts){
        let output = '';

        posts.forEach((post)=>{
            output += 
            `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `
        });
        this.post.innerHTML = output;
    }
    showAlert(msg, className){
        this.clearAlert();
        //CREAR UN DIV
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.postContainer');
        const posts = document.querySelector('#posts');
        container.insertBefore(div, posts);
        setTimeout(()=>{
            this.clearAlert()
        }, 3000);
    }
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
    clearFields(){
        this.titleInput.value = '';
        this.body.value = '';
    }
    fillForm(data){
        this.titleInput.value = data.title;
        this.body.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }
    clearIdInput(){
        this.idInput.value = '';
    }
    changeFormState(type){
        if(type === 'edit'){
            this.postSumbit.textContent = 'Update Post';
            this.postSumbit.className = 'post-submit btn btn-warning btn-block';

            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-danger btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));
            const cardForm = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSumbit.textContent = 'Postear';
            this.postSumbit.className = 'post-submit btn btn-primary btn-block';
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }
            this.clearIdInput();
            this.clearFields();
        }
    }
}

export const ui = new UI();