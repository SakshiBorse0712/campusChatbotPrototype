const chats = [
  {topic:"Fee Payment Inquiry", messages:[
    {role:"user", text:"When is the fee due?"},
    {role:"bot", text:"The semester fee deadline is Oct 31, 2025."}
  ]},
  {topic:"Scholarship Info", messages:[
    {role:"user", text:"How can I apply for scholarship?"},
    {role:"bot", text:"You can apply online.\nHere is the form link:\nwww.college.edu/scholarship"}
  ]},
  {topic:"Timetable", messages:[
    {role:"bot", text:"Here is today’s timetable:\n\n9-10  ➝ Math\n10-11 ➝ DSA\n12-1  ➝ Innovation\n2:30-3:30 ➝ Humanities"}
  ]}
];

let currentChatIndex = 0;
let selectedCollege = "";

// Navigation
function gotoLogin(){
  selectedCollege = document.getElementById("college").value;
  if(!selectedCollege){
    alert("Please select a college first!");
    return;
  }
  document.getElementById("collegeScreen").style.display="none";
  document.getElementById("loginScreen").style.display="flex";
}
function mockLogin(){
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value.trim();
  
  if(!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")){
    alert("Email must be a valid Gmail or Yahoo address.");
    return;
  }
  if(password.length < 4){
    alert("Password must be at least 4 characters.");
    return;
  }

  document.getElementById("loginScreen").style.display="none";
  document.getElementById("chatScreen").style.display="block";
  renderLogPanel();
  selectChat(currentChatIndex);
}

// Render logs
function renderLogPanel(){
  const logList=document.getElementById("logList");
  logList.innerHTML="";
  chats.forEach((chat,index)=>{
    const div=document.createElement("div");
    div.className="log-item";
    if(chat.messages.some(m=>m.role==="error")) div.classList.add("error");
    div.innerText=chat.topic;
    div.onclick=()=>selectChat(index);
    logList.appendChild(div);
  });
}

// Select chat
function selectChat(index){
  currentChatIndex=index;
  document.getElementById("chatHeader").innerHTML = 
    `<span class="college">${selectedCollege}</span> - ${chats[index].topic}`;
  renderMessages();
}

// Render messages
function renderMessages(){
  const box=document.getElementById("chatMessages");
  box.innerHTML="";
  chats[currentChatIndex].messages.forEach(m=>{
    const div=document.createElement("div");
    div.className=m.role;
    div.innerText=m.text;
    box.appendChild(div);
  });
  box.scrollTop=box.scrollHeight;
}

// Send new message
document.getElementById("sendBtn").onclick=()=>{
  const input=document.getElementById("messageInput");
  const text=input.value.trim();
  if(!text) return;
  chats[currentChatIndex].messages.push({role:"user", text});
  if(text.toLowerCase().includes("mistake") || text.toLowerCase().includes("error")){
    chats[currentChatIndex].messages.push({role:"error", text:"⚠ Message sent to faculty for verification"});
  } else {
    chats[currentChatIndex].messages.push({role:"bot", text:"[Simulated reply]\nThank you for your query.\nWe will get back soon."});
  }
  renderMessages();
  renderLogPanel();
  input.value="";
};