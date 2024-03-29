var work = document.getElementById("portfolioItemContainer");
var workRequest = new XMLHttpRequest();

var link = document.getElementById("socialLinkContent");
var linkRequest = new XMLHttpRequest();

var aboutMeButton = document.getElementById("aboutMeButton");
var aboutMeModal = document.getElementById("aboutMeModal")
var closeModal = document.getElementById("closeModal");

linkRequest.open("GET", "json/links.json", true);
linkRequest.onreadystatechange = function () {
    if (linkRequest.readyState === 4) {
        if (linkRequest.status === 200 || linkRequest.status == 0) {
            var html = "";
            JSON.parse(linkRequest.responseText).forEach(function (link) {
                html += "<div class=\"links waves-effect\"><a href=" + link.url + " class=\"black-text valign-wrapper\" target=\"_blank\"><i class=\"link_icon mdi mdi-" + link.icon + "\" style=\"color: " + link.color + "\"></i>&nbsp; " + link.name + "</a></div>";
            });
            link.innerHTML = html;
        }
    }
};
linkRequest.send(null);

workRequest.open("GET", "json/items.json", true);
workRequest.onreadystatechange = function () {
    if (workRequest.readyState === 4) {
        if (workRequest.status === 200 || workRequest.status == 0) {
            var html = "";
            JSON.parse(workRequest.responseText).forEach(function (work) {
                html +=
                    "<div class=\"work-card\">"
                    +   "<div class=\"card hoverable\">"
                    +       "<div class=\"card-image waves-effect waves-block waves-light\">"
                    +           "<img class=\"activator work-image\" src=" + work.image + ">"
                    +       "</div>"
                    +       "<div class=\"card-content\">"
                    +           "<span class=\"card-title activator grey-text text-darken-4\">"
                    +               work.name
                    +               "<i class=\"material-icons right\">keyboard_arrow_up</i>"
                    +           "</span>"
                    +           "<p><a href=" + work.link + " target=\"_blank\"><i class=\"link_icon mdi mdi-code-tags\" style=\"color: black; font-size: 24px\"></i></a></p>"
                    +       "</div>"
                    +       "<div class=\"card-reveal\">"
                    +           "<span class=\"card-title grey-text text-darken-4\">"
                    +               work.name
                    +               "<i class=\"material-icons right\">close</i>"
                    +           "</span>"
                    +           "<p>" + work.description + "</p>"
                    +       "</div>"
                    +   "</div>"
                    + "</div>";
            });
            work.innerHTML = html;
        }
    }
};
workRequest.send(null);

aboutMeButton.onclick = function() {
    aboutMeModal.style.display = "block";
}
closeModal.onclick = function() {
    aboutMeModal.style.display = "none";
}