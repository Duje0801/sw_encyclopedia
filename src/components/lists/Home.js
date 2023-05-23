import Navigation from "../navigation";

function Home() {
  return (
    <div>
      <Navigation />
      <div className="homeText">
        <p>
          Welcome to the Star Wars Encyclopedia, your ultimate guide to the vast
          galaxy far, far away! We extend a warm welcome to you, dear visitor,
          as you embark on a journey through the rich tapestry of Star Wars
          lore. Here, you will find a treasure trove of information on beloved
          characters, captivating planets, thrilling starships, and so much
          more.
        </p>
        <p>
          Immerse yourself in the fascinating world of Star Wars, where the
          stories of heroes and villains unfold in epic battles of good versus
          evil. Our encyclopedia is a dynamic platform that allows you to
          explore, contribute, and shape the content just like on a real wiki.
          You have the power to edit, delete, add, and expand upon the existing
          knowledge, ensuring that this resource remains a living and evolving
          tribute to the Star Wars universe. 
        </p>
        <p>
          May the Force be with you as you navigate this digital galaxy of
          knowledge. Enjoy your adventure and may you find enlightenment in
          every entry. Welcome to the Star Wars Encyclopedia, where the past,
          present, and future of this timeless saga await your discovery!
        </p>
      </div>
    </div>
  );
}

export default Home;
