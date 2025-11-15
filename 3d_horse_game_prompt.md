You are an expert game developer. Create a 3D browser-based horse riding game using Three.js and JavaScript. The game should allow the player to ride a horse through various environments.

**1. Core Gameplay:**

*   **Horse Controls:** Implement controls for the horse's movement. The player should be able to make the horse walk, trot, gallop, and jump using keyboard inputs (e.g., W, A, S, D for movement, Spacebar for jump, Shift to toggle speed).
*   **Camera:** The camera should be a third-person camera that follows the horse smoothly. The player should be able to rotate the camera around the horse using the mouse.
*   **Player Character:** A simple animated character model should be mounted on the horse.

**2. Environments:**

*   The key feature is the ability to switch between different environments.
*   Create a simple UI (e.g., a dropdown menu or buttons) to allow the player to select and load an environment.
*   Implement the following environments:
    *   **Pastures:** A grassy, open field with rolling hills and a few trees.
    *   **Desert:** A vast desert landscape with sand dunes.
    *   **Snowy Forest:** A forest with snow-covered ground and trees.
*   Each environment should have a skybox and appropriate ground textures.

**3. 3D Assets:**

*   Use publicly available, free 3D models for the horse, rider, and environment assets (trees, rocks, etc.). Provide placeholders if specific assets are not immediately available.
*   The horse and rider models should have basic animations (e.g., walk, trot, gallop, jump).

**4. Technical Implementation:**

*   **Framework:** Use Three.js for 3D rendering.
*   **Physics:** Implement basic physics for collisions with the ground and obstacles. A simple physics library (like Cannon.js or Ammo.js) can be integrated.
*   **Code Structure:** Organize the code into modules for clarity (e.g., `PlayerControls.js`, `Environment.js`, `main.js`).

**5. User Interface (UI):**

*   Create a simple HTML/CSS UI for the environment selector.
*   Display basic instructions on the screen for the controls.

**Example Implementation Steps:**

1.  Set up a basic Three.js scene with a plane for the ground and a skybox.
2.  Import the horse and rider models into the scene.
3.  Implement keyboard controls for moving the horse model.
4.  Set up the third-person camera to follow the horse.
5.  Create the first environment (e.g., Pastures) with its specific assets and textures.
6.  Build the UI to switch between scenes.
7.  Implement the other environments (Desert, Snowy Forest).
8.  (Optional) Add basic animations to the horse and rider.
9.  (Optional) Integrate a physics engine for more realistic movement and collisions.

The final result should be a functional and visually appealing 3D horse riding game that runs smoothly in a web browser, showcasing the different environments.
