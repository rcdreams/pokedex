let typesColors = {
    "bug": "#90c12c",
    "dark": "#5a5366",
    "dragon": "#0a6dc4",
    "electric": "#f3d23b",
    "fairy": "#ec8fe6",
    "fighting": "#ce4069",
    "fire": "#ff9c54",
    "flying": "#8fa8dd",
    "ghost": "#5269ac",
    "grass": "#63bb5b",
    "ground": "#d97746",
    "ice": "#74cec0",
    "normal": "#9099a1",
    "poison": "#ab6ac8",
    "psychic": "#f97176",
    "rock": "#c7b78b",
    "steel": "#5a8ea1",
    "water": "#4d90d5",
    "none": "var(--blue2)"
};

let name = $("name")[0].innerHTML;
let number = $("number")[0].innerHTML;
let forms = [];
$("form").each(function(i) {
    let name = $(this).find("name").html();
    let types = $(this).find("types").html().split("/");
    if(types.length == 1) types.push("None");
    let abilities = $(this).find("abilities").html().split("/");
    let hp = $(this).find("hp").html().split("/");
    let atk = $(this).find("atk").html().split("/");
    let def = $(this).find("def").html().split("/");
    let spAtk = $(this).find("spAtk").html().split("/");
    let spDef = $(this).find("spDef").html().split("/");
    let speed = $(this).find("speed").html().split("/");
    let species = $(this).find("species").html();
    let description = $(this).find("description").html();
    $(this).find("description").prepend(`${species}<br><br>"`);
    $(this).find("description").append(`"`);
    $(this).append(`<stats></stats>`);
    $(this).find("stats").append("&nbsp&nbsp&nbsp&nbspABILITIES:<br>");
    for(ability of abilities) {
        $(this).find("stats").append(`-${ability}<br>`);
    }
    $(this).find("stats").append("<br>&nbsp&nbsp&nbsp&nbspSTATS:<br>");
    $(this).find("stats").append(`Hp-${hp}<br>Atk-${atk}<br>Def-${def}<br>Sp.Atk-${spAtk}<br>Sp.Def-${spDef}<br>Speed-${speed}<br>`);
    $(this).append(`<div class="pkmnImgContainer"><img class="pkmnImg" src="art/official/${number}${i == 0 ? "" : "-" + name.toLowerCase().replace(/[^a-z]/g, '')}.png"></div>`);


    forms.push({name, types, abilities, hp, atk, def, spAtk, spDef, speed, species, description});
});
let evolutionFrom = $("from")[0].innerHTML;
let evolutionMethod = $("method")[0].innerHTML;
$("from").prepend(`<br>Evolves from:<br>-`);
$("from").append(`-<br>`);

if(evolutionFrom == "") {
    $("from").hide();
    $("method").hide();
    $("evolution").append("<span id='basicStage'>-Basic Stage-</span>");
}


$("body").prepend(`
    <title>#${number} - ${name}</title>
    <img id="logo" src="logo.png"><br><br>
`);

$("#logo").click(function() {
    location.href = "/pokedex";
});

$("body").append(`<div id="formicons"></div>`);
for(let form of forms) {
    $("#formicons").append(`<span class="formicon" name="${form.name}">${form.name}</span>`);
}
$(".formicon").click(function() {
    $(".formicon").css("font-weight", "unset");
    $(".formicon").css("color", "black");
    $(this).css("font-weight", "bold");
    $(this).css("color", "purple");
    let form = $(this).attr("name");
    showForm(form);
});

function showForm(form) {
    for(let form_ of forms) {
        if(form_.name == form) {
            setTypes(form_.types[0], form_.types[1]);
        }
    }
    $("form").each(function() {
        if($(this).find("name")[0].innerHTML == form) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}

function setTypes(type0, type1) {
    type0 = type0.toLowerCase().replace(/[^a-z]/g, '');
    type1 = type1.toLowerCase().replace(/[^a-z]/g, '');
    $("#type0").attr("src", `art/types/${type0}.png`);
    $("#type1").attr("src", `art/types/${type1}.png`);

    let stripProportion = window.getComputedStyle(document.body).getPropertyValue('--pokeball-strip-proportion');
    $("#pokeball1").css("background", `linear-gradient(180deg, ${typesColors[type0]} 0%, ${typesColors[type0]} ${stripProportion}, rgba(255,255,255,0) ${stripProportion})`);
    $("#pokeball2").css("background", `linear-gradient(0deg, ${typesColors[type1]} 0%, ${typesColors[type1]} ${stripProportion}, rgba(255,255,255,0) ${stripProportion})`);

    $("body").css("background-image", `linear-gradient(to right, ${typesColors[type0]} 1px, transparent 1px),
    linear-gradient(to bottom, ${typesColors[type0]} 1px, transparent 1px)`);
}

$("body").append(`<img class="type" id="type0"></span>`);
$("#type0").after(`<img class="type" id="type1"></span>`);

$("#type0").attr("src", "art/types/none.png");
$("#type1").attr("src", "art/types/none.png");

$("#type0").before("<span id='typeShadow0'></span>");
$("#type1").before("<span id='typeShadow1'></span>");

$("body").append(`<div id="strip"><div>`);

$("body").append(`<div id="pokeball0"><div>`);
$("body").append(`<div id="pokeball1"><div>`);
$("body").append(`<div id="pokeball2"><div>`);
$("body").append(`<div id="pokeball3"><div>`);

$("body").append(`<div id="base0"><div>`);
$("body").append(`<div id="base1"><div>`);


$($(".formicon")[0]).css("font-weight", "bold");
$($(".formicon")[0]).css("color", "purple");
showForm(forms[0].name);

if(forms.length == 1) {
    $("#formicons").hide();
    $("form name").hide();
}

$("body").show();