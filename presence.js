const presence = new Presence({
  clientId: '1233135474395189399', // Reemplaza con el Client ID correcto
});

const browsingTimestamp = Math.floor(Date.now() / 1000);

enum ActivityAssets {
  Logo = 'https://cdn.rcd.gg/PreMiD/websites/G/GuitarFlash/assets/logo.png',
}

presence.on('UpdateData', async () => {
  const presenceData = {
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
  };

  const { pathname, href } = document.location;
  const pathList = pathname.split('/').filter(Boolean);

  switch (pathList[0] ?? '/') {
    case '/': {
      presenceData.details = 'Browsing Guitar Flash';
      break;
    }
    case 'play': {
      presenceData.details = 'Playing a song';
      presenceData.state = document.querySelector('.song-title')?.textContent || 'Unknown Song';
      presenceData.buttons = [{ label: 'Play Now', url: href }];
      break;
    }
    case 'leaderboard': {
      presenceData.details = 'Checking the Leaderboards';
      break;
    }
    case 'multiplayer': {
      presenceData.details = 'Playing Multiplayer Mode';
      break;
    }
    case 'settings': {
      presenceData.details = 'Changing Settings';
      break;
    }
    default: {
      presenceData.details = 'Exploring Guitar Flash';
      break;
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.clearActivity();
});
  