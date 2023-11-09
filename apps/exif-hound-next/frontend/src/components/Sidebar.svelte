<script lang="ts">
  import loadImages from "../utils/FileLoader";
  import { SaveFile } from "../../wailsjs/go/main/App";

  let savefile = (e) => {
    return loadImages(e.target.files)
        .then(images => {
            images.map(image => {
                SaveFile(image.name, image.data, image.ext)
            });
        });
  }

</script>

<main>
    <div class="sidebar">
        <div class="logo-wrap">
            <svg width="40" height="40" viewBox="0 0 1295 1326" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M608.848 13.5455C590.072 38.9097 586.564 83.3835 625.68 137.984C650.162 172.156 675.67 191.899 697.592 208.866C717.746 224.465 734.868 237.717 745.374 257.678C753.261 272.664 760.379 289.351 767.179 305.294C779.289 333.686 790.39 359.714 803.032 369.546C805.176 371.214 807.942 373.038 811.339 375.277C839.216 393.654 909.619 440.066 1028.32 658.748C1073.19 741.42 1186.47 890.736 1294.67 1021.16C986.242 1023.76 817.127 1150.49 729.605 1325.74C703.841 1258.65 684.906 1203.67 679.574 1176.38C668.334 1118.86 668.071 1074.45 667.868 1040.06C667.731 1016.94 667.621 998.354 664.22 983.363C657.122 952.078 621.129 899.621 585.848 874.102C574.026 865.55 558.564 867.052 545.472 873.494C491.987 899.81 394.421 934.539 267.344 942.732C231.035 945.073 195.248 934.739 163.938 916.204L98.0788 877.217C85.3362 869.673 73.3748 860.821 62.5295 850.738C24.637 815.511 7.7651 797.441 1.263 774.075C-4.01216 755.119 7.90437 736.403 24.6031 725.995L277.254 568.515C309.275 455.375 339.057 436.074 409.242 390.59C411.17 389.341 413.129 388.071 415.119 386.78C438.064 371.888 458.442 362.197 476.006 353.845C544.547 321.25 570.249 309.028 538.573 87.5358C533.615 52.8688 559.063 -4.03075 604.687 0.225847C610.879 0.803479 612.548 8.54762 608.848 13.5455Z" fill="white"/>
            </svg>
        </div>

        <div class="sidebar-actions">

            <button class="sidebar-button" >
                <svg class="sidebar-icon" fill="whitesmoke" width="30" height="30"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
                <input
                    type="file"
                    style="opacity: 0;"
                    on:change={savefile}
                />
            </button>

            <div class="sidebar-button">
                <svg class="sidebar-icon" fill="whitesmoke" width="30" height="30"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>    
            </div>
        </div>


        
        <div class="sidebar-nav">              
            <div class="sidebar-button sidebar-button-active">
                <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="whitesmoke" width="30" height="30">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>  
            </div>
        </div>

        <div class="sidebar-button">
            <svg class="sidebar-icon" fill="whitesmoke" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
            </svg>              
        </div>

        <div class="sidebar-button">
            <svg class="sidebar-icon" fill="whitesmoke" width="30" height="30"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
            </svg>  
        </div>
          

    </div>
</main>


<style>
    .sidebar {
        background-color: #111;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        height: 100vh;
        width: 75px;
    }

    .logo-wrap {
        width: 50px;
        height: 50px;
        margin-top: 20px;
        justify-self: center;
    }

    .sidebar-actions {
        margin-top: 40px;
        align-items: center;
        justify-self: center;
    }

    .sidebar-nav {
        margin-top: 50px;
        align-items: center;
        justify-self: center;
    }

    .sidebar-button {
        background-color: #111;
        height: 50px;
        width: 50px;
        border-radius: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all;
        transition-duration: 800ms;
        margin-bottom: 25px;
    }

    .sidebar-button:hover {
        background-color: whitesmoke;
        height: 50px;
        width: 50px;
        border-radius: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all;
        transition-duration: 800ms;

    }

    .sidebar-button-active {
        background-color: #222;
    }

    .sidebar-button:hover > .sidebar-icon {
        fill: #111
    }
    .sidebar-icon {
        fill: whitesmoke;
    }
</style>