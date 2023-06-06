const posts = [];

const inputTitleNode = document.getElementById ('input_title');
const inputTextNode = document.getElementById ('input_text');
const publicPostBtn = document.getElementById ('public_post_btn');

const postsListNode = document.getElementById ('posts_list')
const validationInfoTitleAlert = document.getElementById('validationInfo__title-alert')
const validationInfoTextAlert = document.getElementById('validationInfo__text-alert')
const validationInfoTitleNode = document.getElementById('validationInfo__title-lenght');
const validationInfoTextNode = document.getElementById('validationInfo__text-lenght');
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

const showWarningLenght = (length, limit, validationInfoLenght) => {
    validationInfoLenght.innerText = `${length}/${limit}`;
    if (length > limit) {
        validationInfoLenght.classList.add(ALERT_VALUE_CLASSNAME);
    }
    else {
        validationInfoLenght.classList.remove(ALERT_VALUE_CLASSNAME);
    }
}

const checkLenght = () => {
    const titleLength = inputTitleNode.value.length;
    const textLength = inputTextNode.value.length;
    
    showWarningLenght(titleLength, LIMIT_LENGHT_TITLE, validationInfoTitleNode);
    showWarningLenght(textLength, LIMIT_LENGHT_TEXT, validationInfoTextNode);
    disabledBtn();    
}

inputTitleNode.addEventListener('input', checkLenght);
inputTextNode.addEventListener('input', checkLenght);

function isExitingValue (value, validationInfo) {
    if (!value) {
        validationInfo.style.visibility = "visible"; 
        return true;
    }
    validationInfo.style.visibility = "hidden";
}

publicPostBtn.addEventListener('click', function() {
    const postFormUser = getPostFromUser ();   
    
    if (isExitingValue(inputTitleNode.value, validationInfoTitleAlert) == true |
    isExitingValue(inputTextNode.value, validationInfoTextAlert) == true)
    {
        return;
    }
       
    clearInput ();
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

function clearInput () {
    inputTitleNode.value = '';
    inputTextNode.value = '';  
    validationInfoTitleNode.innerText = `0/${LIMIT_LENGHT_TITLE}`;
    validationInfoTextNode.innerText = `0/${LIMIT_LENGHT_TEXT}`;
}

function addPost({title, text}) {
    const currentDate = new Date().toLocaleString();
    posts.push({
        title,
        text,
        currentDate
    });
}

function renderPost() {
    let postHTML = '';
    posts.forEach(post => {
        postHTML += 
        `<div class="posts_list">
            <p class="post_item post_item__date">${post.currentDate}</p>
            <p class="post_item post_item__title">${post.title}</p>
            <p class="post_item post_item__text">${post.text}</p>
        </div>`;
    })
    postsListNode.innerHTML = postHTML;
}


