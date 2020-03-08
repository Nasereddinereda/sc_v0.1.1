const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - window.innerWidth / 7; //document.width is obsolete
canvas.height = window.innerHeight; //document.height is obsolete
const ctx = canvas.getContext("2d");

let planer = {
  totalBeginImage: 50,
  imageBegin: [],
  totalTurnImage: 100,
  imageTurn: [],
  totalEndImage: 48,
  imageEnd: [],
  totalStrichImage: 20,
  openStrich: [],
  closeStrich: [],
  imageStrich1: [],
  imageStrich2: [],
  imageStrich3: [],
  imageStrich4: [],
  strich1: true,
  strich2: false,
  strich3: false,
  strich4: false,
  currentBeginPosition: 0,
  currentTurnPosition: 0,
  currentStrichOpenPosition: 0,
  currentStrichClosePosition: 10,
  turnBegin: true
};

for (var i = 0; i < planer.totalBeginImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_aufbau/HUD_Aufbau_" + slug + ".png";
  planer.imageBegin.push(img);
}

for (var i = 0; i < planer.totalTurnImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `00${i}`;
  } else if (i > 9 && i < 100) {
    var slug = `0${i}`;
  }
  img.src = "./screens/HUD_Abbau/HUD_Abbau_" + slug + ".png";
  planer.imageTurn.push(img);
}

for (var i = 0; i < planer.totalEndImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_Loop/HUD_Loop_" + slug + ".png";
  planer.imageEnd.push(img);
}

for (var i = 0; i < planer.totalStrichImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_Strich_01/HUD_Strich_1_" + slug + ".png";
  planer.imageStrich1.push(img);
  planer.openStrich.push(img);
}

for (var i = 0; i < planer.totalStrichImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_Strich_02/HUD_Strich_2_" + slug + ".png";
  planer.imageStrich2.push(img);
}

for (var i = 0; i < planer.totalStrichImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_Strich_03/HUD_Strich_3" + slug + ".png";
  planer.imageStrich3.push(img);
}

for (var i = 0; i < planer.totalStrichImage; i++) {
  var img = new Image();
  if (i < 10) {
    var slug = `0${i}`;
  } else {
    var slug = `${i}`;
  }
  img.src = "./screens/HUD_Strich_04/HUD_Strich_4_" + slug + ".png";
  planer.imageStrich4.push(img);
}

planer.imageBegin[0].onload = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    planer.imageBegin[planer.currentBeginPosition],
    0,
    0,
    canvas.width,
    canvas.height
  );
  window.requestAnimationFrame(planer.animBegin.bind(planer));
}.bind(planer);

planer.animBegin = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (
    planer.currentBeginPosition < planer.totalBeginImage &&
    this.imageBegin[planer.currentBeginPosition]
  ) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      planer.imageBegin[planer.currentBeginPosition],
      0,
      0,
      canvas.width,
      canvas.height
    );
    planer.currentBeginPosition++;
    window.requestAnimationFrame(planer.animBegin.bind(planer));
  } else {
    window.requestAnimationFrame(planer.animTurn.bind(planer));
  }
};

planer.animTurn = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (
    planer.currentTurnPosition < planer.totalTurnImage &&
    planer.imageTurn[planer.currentTurnPosition] &&
    planer.turnBegin
  ) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      planer.imageTurn[planer.currentTurnPosition],
      0,
      0,
      canvas.width,
      canvas.height
    );
    if (planer.currentStrichOpenPosition < planer.totalStrichImage / 2) {
      ctx.drawImage(
        planer.openStrich[planer.currentStrichOpenPosition],
        0,
        0,
        canvas.width,
        canvas.height
      );

      planer.currentStrichOpenPosition++;
    } else {
      ctx.drawImage(planer.openStrich[10], 0, 0, canvas.width, canvas.height);
    }
    planer.currentTurnPosition++;
    window.requestAnimationFrame(planer.animTurn.bind(planer));
  } else {
    if (planer.turnBegin) {
      planer.currentTurnPosition = 0;
      window.requestAnimationFrame(planer.animTurn.bind(planer));
    }
  }
};

planer.openStrichAnim = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (
    planer.currentTurnPosition < planer.totalTurnImage &&
    planer.imageTurn[planer.currentTurnPosition]
  ) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      planer.imageTurn[planer.currentTurnPosition],
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (planer.currentStrichOpenPosition < 10) {
      console.log(123);
      ctx.drawImage(
        planer.openStrich[planer.currentStrichOpenPosition],
        0,
        0,
        canvas.width,
        canvas.height
      );

      planer.currentStrichOpenPosition++;
    } else {
      ctx.drawImage(planer.openStrich[10], 0, 0, canvas.width, canvas.height);
    }

    if (planer.currentStrichClosePosition < planer.totalStrichImage) {
      ctx.drawImage(
        planer.closeStrich[planer.currentStrichClosePosition],
        0,
        0,
        canvas.width,
        canvas.height
      );

      planer.currentStrichClosePosition++;
    }

    planer.currentTurnPosition++;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  } else {
    planer.currentTurnPosition = 0;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  }
};

// Connect  animation with Link
let instllateur = document.getElementById("instllateur");
let elektro = document.getElementById("elektro");
let lightplaner = document.getElementById("light-planer");
let investor = document.getElementById("investor");

instllateur.addEventListener("click", function() {
  if (!planer.strich1) {
    document.getElementById("circle-text").innerHTML =
      "<h1>INSTALLATEUR</h1><p>Mustertext</p>";
    document.getElementById("text-1").className = "cl-white";
    document.getElementById("text-2").className = "cl-grey";
    document.getElementById("text-3").className = "cl-grey";
    document.getElementById("text-4").className = "cl-grey";
    document.getElementById("instllateur").src =
      "./svg/Trilux_GrafischeElemente_Installateur_white.svg";
    document.getElementById("elektro").src =
      "./svg/Trilux_GrafischeElemente_Elektroplaner.svg";
    document.getElementById("light-planer").src =
      "./svg/Trilux_GrafischeElemente_Lichtplaner.svg";
    document.getElementById("investor").src =
      "./svg/Trilux_GrafischeElemente_Investor.svg";

    planer.turnBegin = false;
    planer.openStrich = planer.imageStrich1;
    planer.currentStrichOpenPosition = 0;
    planer.currentStrichClosePosition = 10;

    if (planer.strich2) {
      planer.closeStrich = planer.imageStrich2;
      planer.strich2 = false;
    } else if (planer.strich3) {
      planer.strich3 = false;
      planer.closeStrich = planer.imageStrich3;
    } else {
      planer.strich4 = false;
      planer.closeStrich = planer.imageStrich4;
    }
    planer.strich1 = true;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  }
});

elektro.addEventListener("click", function() {
  if (!planer.strich2) {
    document.getElementById("circle-text").innerHTML =
      "<h1>ELEKTRO PLANER</h1> <p> Mustertext </p>";
    document.getElementById("text-1").className = "cl-grey";
    document.getElementById("text-2").className = "cl-white";
    document.getElementById("text-3").className = "cl-grey";
    document.getElementById("text-4").className = "cl-grey";
    document.getElementById("instllateur").src =
      "./svg/Trilux_GrafischeElemente_Installateur.svg";
    document.getElementById("elektro").src =
      "./svg/Trilux_GrafischeElemente_Elektroplaner_white.svg";
    document.getElementById("light-planer").src =
      "./svg/Trilux_GrafischeElemente_Lichtplaner.svg";
    document.getElementById("investor").src =
      "./svg/Trilux_GrafischeElemente_Investor.svg";

    planer.openStrich = planer.imageStrich2;
    planer.turnBegin = false;
    planer.currentStrichOpenPosition = 0;
    planer.currentStrichClosePosition = 10;

    if (planer.strich1) {
      planer.closeStrich = planer.imageStrich1;
      planer.strich1 = false;
    } else if (planer.strich3) {
      planer.closeStrich = planer.imageStrich3;
      planer.strich3 = false;
    } else {
      planer.closeStrich = planer.imageStrich4;
      planer.strich4 = false;
    }
    planer.strich2 = true;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  }
});

lightplaner.addEventListener("click", function() {
  if (!planer.strich3) {
    document.getElementById("circle-text").innerHTML =
      "<h1>LICHT PLANER</h1> <p> Mustertext </p>";
    document.getElementById("text-1").className = "cl-grey";
    document.getElementById("text-2").className = "cl-grey";
    document.getElementById("text-3").className = "cl-white";
    document.getElementById("text-4").className = "cl-grey";
    document.getElementById("instllateur").src =
      "./svg/Trilux_GrafischeElemente_Installateur.svg";
    document.getElementById("elektro").src =
      "./svg/Trilux_GrafischeElemente_Elektroplaner.svg";
    document.getElementById("light-planer").src =
      "./svg/Trilux_GrafischeElemente_Lichtplaner_white.svg";
    document.getElementById("investor").src =
      "./svg/Trilux_GrafischeElemente_Investor.svg";

    planer.openStrich = planer.imageStrich3;
    planer.turnBegin = false;
    planer.currentStrichOpenPosition = 0;
    planer.currentStrichClosePosition = 10;

    if (planer.strich1) {
      planer.closeStrich = planer.imageStrich1;
      planer.strich1 = false;
    } else if (planer.strich2) {
      planer.strich2 = false;
      planer.closeStrich = planer.imageStrich2;
    } else {
      planer.strich4 = false;
      planer.closeStrich = planer.imageStrich4;
    }
    planer.strich3 = true;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  }
});

investor.addEventListener("click", function() {
  if (!planer.strich4) {
    document.getElementById("circle-text").innerHTML =
      "<h1>ENDKUNDE/INVESTOR</h1> <p> Mustertext </p>";
    document.getElementById("text-1").className = "cl-grey";
    document.getElementById("text-2").className = "cl-grey";
    document.getElementById("text-3").className = "cl-grey";
    document.getElementById("text-4").className = "cl-white";
    document.getElementById("instllateur").src =
      "./svg/Trilux_GrafischeElemente_Installateur.svg";
    document.getElementById("elektro").src =
      "./svg/Trilux_GrafischeElemente_Elektroplaner.svg";
    document.getElementById("light-planer").src =
      "./svg/Trilux_GrafischeElemente_Lichtplaner.svg";
    document.getElementById("investor").src =
      "./svg/Trilux_GrafischeElemente_Investor_white.svg";

    planer.openStrich = planer.imageStrich4;
    planer.turnBegin = false;
    planer.currentStrichOpenPosition = 0;
    planer.currentStrichClosePosition = 10;

    if (planer.strich1) {
      planer.closeStrich = planer.imageStrich1;
      planer.strich1 = false;
    } else if (planer.strich2) {
      planer.strich2 = false;
      planer.closeStrich = planer.imageStrich2;
    } else {
      planer.strich3 = false;
      planer.closeStrich = planer.imageStrich3;
    }
    planer.strich4 = true;
    window.requestAnimationFrame(planer.openStrichAnim.bind(planer));
  }
});
