<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    size: {
      type: String,
      default: 'large'
    },
    type: {
      type: String,
      default: 'gray'
    },
    modal: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
  .loading {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    overflow: hidden;
    pointer-events: none;
    background: url(./assets/loading.png) no-repeat 0 0;
    background-size: 5000px 300px;
    animation: myAnimation 1.85s steps(1) infinite;
    z-index: 9999;
  }
  @keyframes myAnimation {
    0% { background-position: 0px 0px; }
    0.91% { background-position: -100px 0px; }
    1.82% { background-position: -200px 0px; }
    2.73% { background-position: -300px 0px; }
    3.64% { background-position: -400px 0px; }
    4.55% { background-position: -500px 0px; }
    5.45% { background-position: -600px 0px; }
    6.36% { background-position: -700px 0px; }
    7.27% { background-position: -800px 0px; }
    8.18% { background-position: -900px 0px; }
    9.09% { background-position: -1000px 0px; }
    10.00% { background-position: -1100px 0px; }
    10.91% { background-position: -1200px 0px; }
    11.82% { background-position: -1300px 0px; }
    12.73% { background-position: -1400px 0px; }
    13.64% { background-position: -1500px 0px; }
    14.55% { background-position: -1600px 0px; }
    15.45% { background-position: -1700px 0px; }
    16.36% { background-position: -1800px 0px; }
    17.27% { background-position: -1900px 0px; }
    18.18% { background-position: -2000px 0px; }
    19.09% { background-position: -2100px 0px; }
    20.00% { background-position: -2200px 0px; }
    20.91% { background-position: -2300px 0px; }
    21.82% { background-position: -2400px 0px; }
    22.73% { background-position: -2500px 0px; }
    23.64% { background-position: -2600px 0px; }
    24.55% { background-position: -2700px 0px; }
    25.45% { background-position: -2800px 0px; }
    26.36% { background-position: -2900px 0px; }
    27.27% { background-position: -3000px 0px; }
    28.18% { background-position: -3100px 0px; }
    29.09% { background-position: -3200px 0px; }
    30.00% { background-position: -3300px 0px; }
    30.91% { background-position: -3400px 0px; }
    31.82% { background-position: -3500px 0px; }
    32.73% { background-position: -3600px 0px; }
    33.64% { background-position: -3700px 0px; }
    34.55% { background-position: -3800px 0px; }
    35.45% { background-position: -3900px 0px; }
    36.36% { background-position: -4000px 0px; }
    37.27% { background-position: -4100px 0px; }
    38.18% { background-position: -4200px 0px; }
    39.09% { background-position: -4300px 0px; }
    40.00% { background-position: -4400px 0px; }
    40.91% { background-position: -4500px 0px; }
    41.82% { background-position: -4600px 0px; }
    42.73% { background-position: -4700px 0px; }
    43.64% { background-position: -4800px 0px; }
    44.55% { background-position: -4900px 0px; }
    45.45% { background-position: 0px -100px; }
    46.36% { background-position: -100px -100px; }
    47.27% { background-position: -200px -100px; }
    48.18% { background-position: -300px -100px; }
    49.09% { background-position: -400px -100px; }
    50.00% { background-position: -500px -100px; }
    50.91% { background-position: -600px -100px; }
    51.82% { background-position: -700px -100px; }
    52.73% { background-position: -800px -100px; }
    53.64% { background-position: -900px -100px; }
    54.55% { background-position: -1000px -100px; }
    55.45% { background-position: -1100px -100px; }
    56.36% { background-position: -1200px -100px; }
    57.27% { background-position: -1300px -100px; }
    58.18% { background-position: -1400px -100px; }
    59.09% { background-position: -1500px -100px; }
    60.00% { background-position: -1600px -100px; }
    60.91% { background-position: -1700px -100px; }
    61.82% { background-position: -1800px -100px; }
    62.73% { background-position: -1900px -100px; }
    63.64% { background-position: -2000px -100px; }
    64.55% { background-position: -2100px -100px; }
    65.45% { background-position: -2200px -100px; }
    66.36% { background-position: -2300px -100px; }
    67.27% { background-position: -2400px -100px; }
    68.18% { background-position: -2500px -100px; }
    69.09% { background-position: -2600px -100px; }
    70.00% { background-position: -2700px -100px; }
    70.91% { background-position: -2800px -100px; }
    71.82% { background-position: -2900px -100px; }
    72.73% { background-position: -3000px -100px; }
    73.64% { background-position: -3100px -100px; }
    74.55% { background-position: -3200px -100px; }
    75.45% { background-position: -3300px -100px; }
    76.36% { background-position: -3400px -100px; }
    77.27% { background-position: -3500px -100px; }
    78.18% { background-position: -3600px -100px; }
    79.09% { background-position: -3700px -100px; }
    80.00% { background-position: -3800px -100px; }
    80.91% { background-position: -3900px -100px; }
    81.82% { background-position: -4000px -100px; }
    82.73% { background-position: -4100px -100px; }
    83.64% { background-position: -4200px -100px; }
    84.55% { background-position: -4300px -100px; }
    85.45% { background-position: -4400px -100px; }
    86.36% { background-position: -4500px -100px; }
    87.27% { background-position: -4600px -100px; }
    88.18% { background-position: -4700px -100px; }
    89.09% { background-position: -4800px -100px; }
    90.00% { background-position: -4900px -100px; }
    90.91% { background-position: 0px -200px; }
    91.82% { background-position: -100px -200px; }
    92.73% { background-position: -200px -200px; }
    93.64% { background-position: -300px -200px; }
    94.55% { background-position: -400px -200px; }
    95.45% { background-position: -500px -200px; }
    96.36% { background-position: -600px -200px; }
    97.27% { background-position: -700px -200px; }
    98.18% { background-position: -800px -200px; }
    99.09% { background-position: -900px -200px; }
    100.00% { background-position: -1000px -200px; }
  }
</style>
