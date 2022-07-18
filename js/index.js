import { data } from "./data.js";

const milestonesData = JSON.parse(data).data;

const milestones = document.querySelector(".milestones");

const dataLoads = (getData) => {
  getData.map((el) => {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", `${el._id}`);
    newDiv.setAttribute("class", "milestone border-b");

    newDiv.innerHTML = `
        <div class="flex">
            <div class="checkbox"><input type="checkbox" class="checkInput" /></div>
            <div class="course_title">
                <p>
                    ${el.name}
                    <span><i class="fas fa-chevron-down"></i></span>
                </p>
            </div>
        </div>

        <div class="hidden_panel">
            ${el.modules
              .map(function (module) {
                return `<div class="module border-b">
                <p>${module.name}</p>
            </div>`;
              })
              .join("")}
      </div>
    `;
    milestones.appendChild(newDiv);
  });
};


let checkMarkedList = [];


const openMileStone = () => {
  const milestone_titles = milestones.querySelectorAll(".milestone");
  milestone_titles.forEach((title) => {
    //select flex box node
    title.childNodes[1].addEventListener("click", (e) => {
      
      const courseTitle = title.querySelector('.course_title p');
      courseTitle.classList.toggle('active');
      courseTitle.childNodes[1].firstChild.classList.toggle('fa-chevron-down');
      courseTitle.childNodes[1].firstChild.classList.toggle('fa-chevron-up');
      title.childNodes[3].classList.toggle('show');

      const milestoneImage = document.querySelector(".milestoneImage");
      const name = document.querySelector(".title");
      const details = document.querySelector(".details");
      milestoneImage.style.opacity = "0";
      milestoneImage.src = milestonesData[title.id].image;
      name.innerText = milestonesData[title.id].name;
      details.innerText = milestonesData[title.id].description;
      
      
      if (e.target.nodeName === 'INPUT') {
        const checkbox = e.target;
        if (checkbox.checked) {
          checkMarkedList.push(title);
          milestones.removeChild(title);
          doneListElementRender(checkMarkedList.sort((a, b) => a.id - b.id));
        } else {
          const eventNode = e.target.parentNode.parentNode.parentNode;
          // checkMarkedList = checkMarkedList.filter(el => el.id !== id);
          // doneListElementRender(checkMarkedList);
          // console.log(checkMarkedList);
          // console.log(e.target.parentNode.parentNode.parentNode.id);
          const doneList = document.querySelector(".doneList");
          doneList.removeChild(eventNode);
          console.log(milestone_titles);
          const newmilestones = [...document.querySelectorAll('.milestones .milestone'), eventNode];
          // milestones.appendChild(eventNode);
          console.log(newmilestones);
          afterUncheckedNewMilestonesElementRender(newmilestones.sort((a, b) => a.id - b.id))

          checkMarkedList = checkMarkedList.filter(el => el.id !== eventNode.id);
          doneListElementRender(checkMarkedList);
          
        }
      }     
    });
  });

  
};

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};


const doneListElementRender = (list) => {
  const doneList = document.querySelector(".doneList");
  if (list.length > 0) {
    list.map(element => {
      doneList.appendChild(element);
    })
  }
}


const afterUncheckedNewMilestonesElementRender = (list) => {
  if (list.length > 0) {
    list.map(element => {
      milestones.appendChild(element);
    })
  }
};


dataLoads(milestonesData);
openMileStone();
