const posts = [];

const inputTitleNode = document.getElementById ('input_title');
const inputTextNode = document.getElementById ('input_text');
const publicPostBtn = document.getElementById ('public_post_btn');

const postsListNode = document.getElementById ('posts_list')
const validationInfoTitleNode = document.getElementById('validationInfo_title');
const validationInfoTextNode = document.getElementById('validationInfo_text');
const toolTipNode = document.getElementById('tooltip');
const toolTipAlertTitleNode = document.getElementById('tooltip__alert-title');
const toolTipAlertTextNode = document.getElementById('tooltip__alert-text');

const ALERT_VALUE_CLASSNAME = 'alert_value'
const LIMIT_LENGHT_TITLE = 10;
const LIMIT_LENGHT_TEXT = 20;
validationInfoTitleNode.innerText = `0/${LIMIT_LENGHT_TITLE}`
validationInfoTextNode.innerText = `0/${LIMIT_LENGHT_TEXT}`


const disabledBtn = () => {
    const titleLength = inputTitleNode.value.length;
    const textLength = inputTextNode.value.length;
    if (titleLength > LIMIT_LENGHT_TITLE || textLength > LIMIT_LENGHT_TEXT) {
        publicPostBtn.setAttribute('disabled', true);
    }
    else {
        publicPostBtn.removeAttribute('disabled');
    }
    toolTipAlertTitleNode.innerText = `Заголовок должен быть не более ${LIMIT_LENGHT_TITLE} символов`; 
    toolTipAlertTextNode.innerText = `Длина поста должна быть не более ${LIMIT_LENGHT_TEXT} символов`;
    
}
const checkingLenght = () => {
    const titleLength = inputTitleNode.value.length;
    const textLength = inputTextNode.value.length;
    validationInfoTitleNode.innerText = `${titleLength}/${LIMIT_LENGHT_TITLE}`;
    validationInfoTextNode.innerText = `${textLength}/${LIMIT_LENGHT_TEXT}`;
    if (titleLength > LIMIT_LENGHT_TITLE) {
        validationInfoTitleNode.classList.add(ALERT_VALUE_CLASSNAME);
    }
    else {
        validationInfoTitleNode.classList.remove(ALERT_VALUE_CLASSNAME);
    }
    
    if (textLength > LIMIT_LENGHT_TEXT) {
        validationInfoTextNode.classList.add(ALERT_VALUE_CLASSNAME);
    }
    else {
        validationInfoTextNode.classList.remove(ALERT_VALUE_CLASSNAME);
    }
    disabledBtn();    
}


inputTitleNode.addEventListener('input', checkingLenght);
inputTextNode.addEventListener('input', checkingLenght);

publicPostBtn.addEventListener('click', function() {
    const postFormUser = getPostFromUser ();   
    if (!inputTitleNode.value) {
        return
    };
    if (!inputTextNode.value) {
        return
    };
    inputClearing ();
    addPost(postFormUser);
    renderPost();
})

function getPostFromUser () { 
    const title = inputTitleNode.value;
    const text = inputTextNode.value;
    return {
        title: title,
        text: text
    }
}

function inputClearing () {
    inputTitleNode.value = '';
    inputTextNode.value = '';  
    validationInfoTitleNode.innerText = `0/${LIMIT_LENGHT_TITLE}`;
    validationInfoTextNode.innerText = `0/${LIMIT_LENGHT_TEXT}`;
}

function addPost({title, text}) {
    const nowDate = new Date().toLocaleString();
    posts.push({
        title,
        text,
        nowDate
    });
}

function renderPost() {
    let postHTML = '';
    posts.forEach(post => {
        postHTML += 
        `<div class="posts_list">
            <p class="post_item post_item__date">${post.nowDate}</p>
            <p class="post_item post_item__title">${post.title}</p>
            <p class="post_item post_item__text">${post.text}</p>
        </div>`;
    })
    postsListNode.innerHTML = postHTML;
}

