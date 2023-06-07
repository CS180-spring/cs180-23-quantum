import React, {useContext} from 'react'
import {AuthContext} from '../components/AuthContext'
import Toggle from '../components/ThemeToggle'

const CreateProfile = () => {
  const {setAuth} = useContext(AuthContext)

    return (    
    <section class="bg-offWhite dark:bg-gray-800">
    <div class="lg:grid min-h-screen lg:grid-cols-12">
      <section
        class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Night"
          src="https://images.unsplash.com/photo-1617751218806-9077a9093d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
          class="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div class="hidden lg:relative lg:block lg:p-12">
          <a class="block text-white" href="/">
            <span class="sr-only">Home</span>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 1563.000000 1563.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1563.000000) scale(0.100000,-0.100000)"
            fill="#fff" stroke="none">
            <path d="M7680 15193 c-293 -29 -534 -101 -790 -235 -459 -240 -898 -668
            -1265 -1233 -43 -66 -81 -124 -85 -128 -4 -4 -81 15 -172 42 -489 148 -895
            218 -1319 228 -262 6 -417 -3 -614 -38 -681 -118 -1182 -478 -1450 -1042 -59
            -124 -123 -309 -151 -433 l-18 -81 -76 -11 c-170 -24 -291 -83 -405 -197 -113
            -113 -171 -233 -197 -404 -8 -53 -8 -95 0 -150 24 -171 83 -292 197 -406 116
            -116 236 -173 417 -199 l83 -11 17 -85 c34 -166 90 -387 139 -549 27 -90 46
            -167 42 -171 -4 -4 -62 -42 -128 -85 -567 -368 -993 -805 -1233 -1265 -181
            -345 -254 -677 -231 -1048 40 -655 457 -1306 1194 -1864 101 -77 375 -263 398
            -271 8 -2 -1 -44 -30 -138 -95 -304 -175 -661 -213 -959 -28 -210 -38 -583
            -20 -771 85 -941 576 -1577 1401 -1814 257 -74 465 -100 799 -100 432 1 823
            63 1335 212 105 31 199 58 211 60 18 4 35 -17 109 -129 285 -433 600 -778 935
            -1025 277 -205 581 -345 885 -409 163 -35 437 -44 605 -20 648 91 1253 509
            1789 1235 50 68 125 177 166 241 l76 117 142 -44 c546 -170 1092 -255 1537
            -240 296 10 518 47 760 127 192 63 338 133 490 235 463 311 736 788 827 1445
            25 187 23 598 -5 830 -38 317 -125 717 -221 1017 l-38 122 117 75 c266 172
            523 378 735 590 426 427 673 883 741 1366 24 168 15 442 -20 605 -141 670
            -631 1291 -1434 1820 -112 74 -133 91 -129 109 2 12 29 107 60 211 95 327 156
            622 194 935 27 223 24 647 -6 840 -40 262 -100 472 -193 671 l-50 106 34 54
            c171 270 131 605 -97 835 -68 68 -97 90 -176 127 -101 49 -212 77 -304 77
            -149 0 -337 -73 -451 -174 l-61 -55 -64 20 c-94 30 -258 65 -394 86 -188 28
            -671 25 -900 -6 -309 -41 -664 -119 -959 -211 -70 -22 -130 -40 -132 -40 -2 0
            -37 51 -77 113 -185 284 -353 493 -577 718 -353 355 -669 560 -1049 683 -227
            74 -505 109 -701 89z m264 -233 c223 -22 403 -73 621 -180 375 -182 724 -489
            1049 -920 134 -178 240 -340 230 -350 -5 -5 -68 -30 -139 -58 -541 -205 -1275
            -579 -1803 -919 -45 -29 -87 -53 -91 -53 -5 0 -72 39 -148 86 -563 351 -1149
            650 -1683 859 -102 40 -193 75 -203 78 -21 8 -13 21 120 214 485 699 1080
            1140 1654 1227 176 27 247 29 393 16z m-3514 -1350 c180 -24 455 -77 620 -121
            182 -47 360 -102 360 -110 0 -4 -30 -63 -67 -131 -291 -539 -567 -1274 -758
            -2019 l-37 -147 -147 -37 c-742 -190 -1505 -477 -2029 -763 -62 -34 -116 -62
            -121 -62 -8 0 -61 168 -106 340 -28 107 -87 382 -83 385 2 1 30 16 63 34 234
            123 370 348 368 611 -2 270 -155 508 -397 615 -44 20 -56 29 -52 43 3 9 14 54
            26 100 29 116 79 251 135 362 260 519 723 824 1380 910 138 18 154 18 425 15
            194 -3 306 -10 420 -25z m7640 5 c121 -18 321 -64 333 -75 5 -4 1 -29 -7 -55
            -45 -133 -43 -281 8 -426 67 -191 222 -347 414 -414 182 -63 397 -47 550 42
            24 13 45 23 47 21 1 -1 17 -35 34 -75 78 -179 139 -426 161 -655 16 -161 8
            -619 -14 -768 -41 -289 -72 -442 -136 -685 -54 -204 -85 -300 -96 -300 -5 0
            -126 59 -269 131 -573 288 -1123 489 -1904 696 l-124 33 -48 186 c-184 718
            -481 1500 -763 2008 -31 57 -56 105 -54 106 2 2 19 7 38 13 19 5 76 22 125 36
            303 90 640 159 910 185 61 6 126 13 145 15 89 10 550 -3 650 -19z m-6230 -382
            c413 -158 913 -400 1365 -661 169 -98 356 -212 373 -227 11 -10 -14 -31 -130
            -111 -313 -214 -670 -481 -970 -725 l-156 -127 -184 -22 c-375 -43 -838 -117
            -1163 -185 -93 -19 -170 -33 -172 -32 -5 6 104 397 164 587 169 538 401 1094
            617 1478 56 100 57 101 84 91 15 -6 92 -35 172 -66z m4289 -213 c222 -438 394
            -871 545 -1373 74 -244 141 -495 135 -502 -3 -2 -45 5 -94 16 -297 65 -852
            155 -1235 199 l-185 22 -120 97 c-66 54 -158 128 -205 166 -151 121 -540 409
            -739 547 -107 74 -194 138 -193 144 0 20 447 283 782 459 327 173 668 328 990
            451 l165 63 23 -37 c12 -20 71 -134 131 -252z m-2131 -948 c272 -187 504 -355
            746 -545 l141 -110 -105 6 c-521 31 -1440 34 -1828 7 -235 -16 -230 -20 -109
            74 171 134 444 336 602 447 136 96 356 247 363 248 1 1 86 -57 190 -127z m647
            -871 c83 -6 242 -18 355 -27 l204 -16 111 -96 c635 -554 1175 -1093 1699
            -1696 l130 -148 12 -147 c66 -775 69 -1608 9 -2381 -22 -282 -11 -249 -137
            -396 -461 -538 -1129 -1206 -1692 -1693 -71 -61 -139 -113 -150 -116 -31 -6
            -423 -34 -641 -45 -640 -32 -1474 -16 -2047 39 l-87 8 -108 94 c-610 527
            -1193 1110 -1729 1731 l-101 116 -7 69 c-71 752 -74 1825 -5 2589 l12 131 120
            139 c519 603 1206 1285 1767 1756 l55 46 190 16 c105 8 282 20 395 26 113 6
            234 12 270 14 136 7 1232 -3 1375 -13z m-2675 -123 c-449 -400 -935 -881
            -1303 -1290 -78 -86 -143 -155 -145 -154 -5 6 46 358 87 597 53 310 122 639
            137 653 28 29 1081 220 1234 225 24 0 24 0 -10 -31z m3978 -14 c247 -37 512
            -84 752 -135 187 -39 177 -35 183 -67 48 -223 92 -441 117 -587 34 -191 100
            -638 95 -643 -1 -1 -42 41 -90 95 -349 387 -819 862 -1183 1192 -111 101 -202
            186 -202 188 0 5 23 2 328 -43z m-5458 -237 c0 -1 -16 -79 -35 -171 -68 -326
            -142 -789 -186 -1166 l-21 -184 -47 -56 c-202 -235 -627 -800 -831 -1104 -86
            -129 -59 -143 -212 112 -330 550 -621 1146 -807 1649 l-30 83 52 30 c116 68
            513 261 687 335 372 157 773 296 1175 406 121 33 225 62 230 64 13 5 25 6 25
            2z m6753 -28 c488 -123 1081 -333 1547 -548 202 -94 500 -252 500 -266 0 -20
            -128 -343 -211 -535 -87 -200 -287 -605 -389 -790 -139 -251 -359 -620 -369
            -620 -3 1 -38 49 -78 108 -179 268 -428 604 -699 943 l-181 227 -7 84 c-22
            257 -104 794 -177 1162 -27 137 -49 253 -49 259 0 5 7 6 16 3 8 -3 52 -15 97
            -27z m-9064 -1084 c209 -549 524 -1170 898 -1767 40 -65 73 -121 73 -124 0 -4
            -49 -86 -109 -183 -357 -580 -653 -1167 -856 -1696 -31 -82 -61 -154 -65 -159
            -16 -17 -385 245 -575 409 -446 386 -748 846 -844 1286 -94 438 -5 880 264
            1307 176 281 451 571 784 826 143 109 364 257 371 249 3 -5 30 -71 59 -148z
            m11460 62 c623 -417 1055 -922 1226 -1432 65 -195 79 -286 80 -515 0 -238 -17
            -346 -86 -547 -150 -434 -480 -853 -975 -1238 -112 -88 -368 -265 -382 -265
            -5 0 -34 69 -66 153 -209 547 -545 1208 -908 1785 l-66 104 101 161 c364 587
            741 1344 912 1834 22 61 9 64 164 -40z m-9440 -1114 c-19 -296 -19 -1389 0
            -1681 7 -117 11 -215 8 -218 -13 -13 -427 543 -659 885 l-117 173 119 177
            c198 295 646 898 658 886 3 -2 -2 -102 -9 -222z m7318 89 c274 -352 663 -899
            663 -931 0 -37 -760 -1084 -776 -1068 -1 1 1 59 6 127 21 302 33 783 27 1150
            -6 360 -19 701 -32 813 -4 31 -2 46 4 43 5 -4 54 -64 108 -134z m-8112 -1302
            c201 -296 487 -678 738 -984 100 -123 106 -133 112 -185 46 -418 121 -912 194
            -1266 21 -105 37 -192 35 -194 -6 -6 -250 59 -483 129 -560 167 -1133 403
            -1588 652 l-92 51 30 81 c191 522 481 1112 829 1689 62 103 116 184 120 180 4
            -4 51 -73 105 -153z m9045 -51 c290 -483 532 -959 714 -1409 99 -244 130 -330
            120 -339 -19 -18 -225 -128 -389 -207 -442 -214 -922 -394 -1467 -548 -272
            -78 -298 -83 -298 -65 0 8 9 55 20 104 74 333 179 1008 206 1319 7 76 8 80 59
            140 227 269 616 786 831 1104 38 56 73 101 78 99 5 -2 62 -91 126 -198z
            m-7685 -1649 c298 -327 774 -798 1138 -1125 54 -48 96 -89 95 -90 -7 -6 -512
            71 -733 111 -191 35 -517 103 -523 109 -7 7 -73 324 -111 535 -34 185 -111
            685 -111 715 0 11 32 -21 245 -255z m6329 238 c-2 -13 -17 -120 -34 -238 -50
            -354 -167 -971 -188 -992 -32 -32 -1262 -246 -1250 -218 2 3 73 69 158 146
            402 364 823 786 1165 1167 77 86 143 156 146 156 3 1 5 -9 3 -21z m-8698 -638
            c528 -284 1254 -557 1959 -738 l190 -49 33 -124 c207 -781 408 -1331 696
            -1904 72 -143 131 -264 131 -269 0 -12 -99 -43 -320 -101 -427 -112 -755 -158
            -1130 -159 -234 0 -351 10 -531 44 -636 123 -1085 490 -1297 1060 -176 472
            -183 1105 -22 1805 31 132 135 515 140 515 1 0 69 -36 151 -80z m11034 -121
            c133 -459 194 -850 194 -1254 0 -427 -59 -722 -204 -1022 -253 -525 -724 -841
            -1381 -927 -482 -63 -1113 10 -1726 200 l-112 34 40 73 c22 39 52 96 67 125
            l26 52 91 0 c119 0 209 21 309 69 171 84 288 218 352 406 24 70 27 95 27 205
            0 108 -3 136 -26 205 -37 112 -90 197 -175 281 l-73 73 45 144 c49 156 146
            506 166 600 7 31 18 61 24 66 6 4 54 18 106 31 439 105 1064 315 1496 501 175
            75 540 252 644 312 35 21 46 23 52 13 4 -8 30 -92 58 -187z m-8417 -768 c349
            -71 878 -153 1178 -183 l123 -12 176 -141 c346 -278 701 -543 972 -725 70 -47
            127 -88 128 -91 0 -3 -71 -49 -157 -101 -484 -292 -887 -501 -1336 -692 -172
            -73 -437 -176 -454 -176 -10 0 -164 287 -238 445 -225 479 -447 1097 -574
            1602 -12 45 -24 89 -27 97 -8 21 -11 22 209 -23z m5766 -104 c-21 -79 -63
            -224 -92 -323 l-54 -179 -29 2 c-207 16 -240 15 -324 -6 -135 -33 -221 -82
            -321 -181 -139 -138 -202 -290 -202 -485 0 -119 28 -223 87 -328 46 -84 136
            -181 209 -227 31 -19 56 -39 57 -44 0 -16 -123 -238 -135 -242 -19 -8 -375
            132 -640 252 -189 85 -555 269 -745 375 -210 117 -553 323 -557 335 -2 5 57
            50 129 99 281 191 645 463 962 719 93 75 179 138 190 141 12 2 89 11 171 20
            344 38 952 135 1207 194 139 32 131 44 87 -122z m-3734 -149 c432 -24 1568
            -12 1800 18 l40 5 -39 -33 c-214 -179 -1002 -748 -1038 -748 -20 0 -458 304
            -703 488 -174 132 -354 273 -361 284 -4 7 7 8 32 4 22 -3 143 -11 269 -18z
            m955 -1160 c580 -356 1193 -664 1723 -863 70 -27 127 -52 127 -57 0 -13 -165
            -253 -253 -368 -171 -223 -403 -465 -587 -613 -275 -222 -596 -379 -893 -439
            -96 -20 -142 -23 -317 -23 -229 1 -320 15 -515 80 -517 173 -1027 614 -1447
            1249 l-79 120 38 14 c169 63 446 177 592 243 385 175 895 449 1257 676 139 88
            161 99 179 88 11 -6 90 -55 175 -107z"/>
            <path d="M7615 9744 c-691 -100 -1225 -596 -1365 -1269 -27 -131 -37 -360 -21
            -491 97 -780 714 -1361 1496 -1409 325 -20 686 79 961 263 547 368 813 1025
            674 1663 -118 543 -523 993 -1051 1170 -166 56 -266 71 -474 74 -104 2 -203 1
            -220 -1z"/>
            </g>
            </svg>

          </a>

          <h2 class="mt-6 text-2xl font-bold text-white dark:text-white sm:text-3xl md:text-4xl">
          Welcome to QuantumDB
          </h2>

          <p class="mt-4 leading-relaxed text-white/90">
          Empower Your Data Universe with QuantumDB: Unleash the Power of Next-Generation Database Management.
          </p>
        </div>
      </section>

      <main
        aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <div class="relative -mt-16 block lg:hidden">
            <a
              class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
              href="/"
            >
              <span class="sr-only">Home</span>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="40.000000pt" viewBox="0 0 1563.000000 1563.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1563.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M7680 15193 c-293 -29 -534 -101 -790 -235 -459 -240 -898 -668
                -1265 -1233 -43 -66 -81 -124 -85 -128 -4 -4 -81 15 -172 42 -489 148 -895
                218 -1319 228 -262 6 -417 -3 -614 -38 -681 -118 -1182 -478 -1450 -1042 -59
                -124 -123 -309 -151 -433 l-18 -81 -76 -11 c-170 -24 -291 -83 -405 -197 -113
                -113 -171 -233 -197 -404 -8 -53 -8 -95 0 -150 24 -171 83 -292 197 -406 116
                -116 236 -173 417 -199 l83 -11 17 -85 c34 -166 90 -387 139 -549 27 -90 46
                -167 42 -171 -4 -4 -62 -42 -128 -85 -567 -368 -993 -805 -1233 -1265 -181
                -345 -254 -677 -231 -1048 40 -655 457 -1306 1194 -1864 101 -77 375 -263 398
                -271 8 -2 -1 -44 -30 -138 -95 -304 -175 -661 -213 -959 -28 -210 -38 -583
                -20 -771 85 -941 576 -1577 1401 -1814 257 -74 465 -100 799 -100 432 1 823
                63 1335 212 105 31 199 58 211 60 18 4 35 -17 109 -129 285 -433 600 -778 935
                -1025 277 -205 581 -345 885 -409 163 -35 437 -44 605 -20 648 91 1253 509
                1789 1235 50 68 125 177 166 241 l76 117 142 -44 c546 -170 1092 -255 1537
                -240 296 10 518 47 760 127 192 63 338 133 490 235 463 311 736 788 827 1445
                25 187 23 598 -5 830 -38 317 -125 717 -221 1017 l-38 122 117 75 c266 172
                523 378 735 590 426 427 673 883 741 1366 24 168 15 442 -20 605 -141 670
                -631 1291 -1434 1820 -112 74 -133 91 -129 109 2 12 29 107 60 211 95 327 156
                622 194 935 27 223 24 647 -6 840 -40 262 -100 472 -193 671 l-50 106 34 54
                c171 270 131 605 -97 835 -68 68 -97 90 -176 127 -101 49 -212 77 -304 77
                -149 0 -337 -73 -451 -174 l-61 -55 -64 20 c-94 30 -258 65 -394 86 -188 28
                -671 25 -900 -6 -309 -41 -664 -119 -959 -211 -70 -22 -130 -40 -132 -40 -2 0
                -37 51 -77 113 -185 284 -353 493 -577 718 -353 355 -669 560 -1049 683 -227
                74 -505 109 -701 89z m264 -233 c223 -22 403 -73 621 -180 375 -182 724 -489
                1049 -920 134 -178 240 -340 230 -350 -5 -5 -68 -30 -139 -58 -541 -205 -1275
                -579 -1803 -919 -45 -29 -87 -53 -91 -53 -5 0 -72 39 -148 86 -563 351 -1149
                650 -1683 859 -102 40 -193 75 -203 78 -21 8 -13 21 120 214 485 699 1080
                1140 1654 1227 176 27 247 29 393 16z m-3514 -1350 c180 -24 455 -77 620 -121
                182 -47 360 -102 360 -110 0 -4 -30 -63 -67 -131 -291 -539 -567 -1274 -758
                -2019 l-37 -147 -147 -37 c-742 -190 -1505 -477 -2029 -763 -62 -34 -116 -62
                -121 -62 -8 0 -61 168 -106 340 -28 107 -87 382 -83 385 2 1 30 16 63 34 234
                123 370 348 368 611 -2 270 -155 508 -397 615 -44 20 -56 29 -52 43 3 9 14 54
                26 100 29 116 79 251 135 362 260 519 723 824 1380 910 138 18 154 18 425 15
                194 -3 306 -10 420 -25z m7640 5 c121 -18 321 -64 333 -75 5 -4 1 -29 -7 -55
                -45 -133 -43 -281 8 -426 67 -191 222 -347 414 -414 182 -63 397 -47 550 42
                24 13 45 23 47 21 1 -1 17 -35 34 -75 78 -179 139 -426 161 -655 16 -161 8
                -619 -14 -768 -41 -289 -72 -442 -136 -685 -54 -204 -85 -300 -96 -300 -5 0
                -126 59 -269 131 -573 288 -1123 489 -1904 696 l-124 33 -48 186 c-184 718
                -481 1500 -763 2008 -31 57 -56 105 -54 106 2 2 19 7 38 13 19 5 76 22 125 36
                303 90 640 159 910 185 61 6 126 13 145 15 89 10 550 -3 650 -19z m-6230 -382
                c413 -158 913 -400 1365 -661 169 -98 356 -212 373 -227 11 -10 -14 -31 -130
                -111 -313 -214 -670 -481 -970 -725 l-156 -127 -184 -22 c-375 -43 -838 -117
                -1163 -185 -93 -19 -170 -33 -172 -32 -5 6 104 397 164 587 169 538 401 1094
                617 1478 56 100 57 101 84 91 15 -6 92 -35 172 -66z m4289 -213 c222 -438 394
                -871 545 -1373 74 -244 141 -495 135 -502 -3 -2 -45 5 -94 16 -297 65 -852
                155 -1235 199 l-185 22 -120 97 c-66 54 -158 128 -205 166 -151 121 -540 409
                -739 547 -107 74 -194 138 -193 144 0 20 447 283 782 459 327 173 668 328 990
                451 l165 63 23 -37 c12 -20 71 -134 131 -252z m-2131 -948 c272 -187 504 -355
                746 -545 l141 -110 -105 6 c-521 31 -1440 34 -1828 7 -235 -16 -230 -20 -109
                74 171 134 444 336 602 447 136 96 356 247 363 248 1 1 86 -57 190 -127z m647
                -871 c83 -6 242 -18 355 -27 l204 -16 111 -96 c635 -554 1175 -1093 1699
                -1696 l130 -148 12 -147 c66 -775 69 -1608 9 -2381 -22 -282 -11 -249 -137
                -396 -461 -538 -1129 -1206 -1692 -1693 -71 -61 -139 -113 -150 -116 -31 -6
                -423 -34 -641 -45 -640 -32 -1474 -16 -2047 39 l-87 8 -108 94 c-610 527
                -1193 1110 -1729 1731 l-101 116 -7 69 c-71 752 -74 1825 -5 2589 l12 131 120
                139 c519 603 1206 1285 1767 1756 l55 46 190 16 c105 8 282 20 395 26 113 6
                234 12 270 14 136 7 1232 -3 1375 -13z m-2675 -123 c-449 -400 -935 -881
                -1303 -1290 -78 -86 -143 -155 -145 -154 -5 6 46 358 87 597 53 310 122 639
                137 653 28 29 1081 220 1234 225 24 0 24 0 -10 -31z m3978 -14 c247 -37 512
                -84 752 -135 187 -39 177 -35 183 -67 48 -223 92 -441 117 -587 34 -191 100
                -638 95 -643 -1 -1 -42 41 -90 95 -349 387 -819 862 -1183 1192 -111 101 -202
                186 -202 188 0 5 23 2 328 -43z m-5458 -237 c0 -1 -16 -79 -35 -171 -68 -326
                -142 -789 -186 -1166 l-21 -184 -47 -56 c-202 -235 -627 -800 -831 -1104 -86
                -129 -59 -143 -212 112 -330 550 -621 1146 -807 1649 l-30 83 52 30 c116 68
                513 261 687 335 372 157 773 296 1175 406 121 33 225 62 230 64 13 5 25 6 25
                2z m6753 -28 c488 -123 1081 -333 1547 -548 202 -94 500 -252 500 -266 0 -20
                -128 -343 -211 -535 -87 -200 -287 -605 -389 -790 -139 -251 -359 -620 -369
                -620 -3 1 -38 49 -78 108 -179 268 -428 604 -699 943 l-181 227 -7 84 c-22
                257 -104 794 -177 1162 -27 137 -49 253 -49 259 0 5 7 6 16 3 8 -3 52 -15 97
                -27z m-9064 -1084 c209 -549 524 -1170 898 -1767 40 -65 73 -121 73 -124 0 -4
                -49 -86 -109 -183 -357 -580 -653 -1167 -856 -1696 -31 -82 -61 -154 -65 -159
                -16 -17 -385 245 -575 409 -446 386 -748 846 -844 1286 -94 438 -5 880 264
                1307 176 281 451 571 784 826 143 109 364 257 371 249 3 -5 30 -71 59 -148z
                m11460 62 c623 -417 1055 -922 1226 -1432 65 -195 79 -286 80 -515 0 -238 -17
                -346 -86 -547 -150 -434 -480 -853 -975 -1238 -112 -88 -368 -265 -382 -265
                -5 0 -34 69 -66 153 -209 547 -545 1208 -908 1785 l-66 104 101 161 c364 587
                741 1344 912 1834 22 61 9 64 164 -40z m-9440 -1114 c-19 -296 -19 -1389 0
                -1681 7 -117 11 -215 8 -218 -13 -13 -427 543 -659 885 l-117 173 119 177
                c198 295 646 898 658 886 3 -2 -2 -102 -9 -222z m7318 89 c274 -352 663 -899
                663 -931 0 -37 -760 -1084 -776 -1068 -1 1 1 59 6 127 21 302 33 783 27 1150
                -6 360 -19 701 -32 813 -4 31 -2 46 4 43 5 -4 54 -64 108 -134z m-8112 -1302
                c201 -296 487 -678 738 -984 100 -123 106 -133 112 -185 46 -418 121 -912 194
                -1266 21 -105 37 -192 35 -194 -6 -6 -250 59 -483 129 -560 167 -1133 403
                -1588 652 l-92 51 30 81 c191 522 481 1112 829 1689 62 103 116 184 120 180 4
                -4 51 -73 105 -153z m9045 -51 c290 -483 532 -959 714 -1409 99 -244 130 -330
                120 -339 -19 -18 -225 -128 -389 -207 -442 -214 -922 -394 -1467 -548 -272
                -78 -298 -83 -298 -65 0 8 9 55 20 104 74 333 179 1008 206 1319 7 76 8 80 59
                140 227 269 616 786 831 1104 38 56 73 101 78 99 5 -2 62 -91 126 -198z
                m-7685 -1649 c298 -327 774 -798 1138 -1125 54 -48 96 -89 95 -90 -7 -6 -512
                71 -733 111 -191 35 -517 103 -523 109 -7 7 -73 324 -111 535 -34 185 -111
                685 -111 715 0 11 32 -21 245 -255z m6329 238 c-2 -13 -17 -120 -34 -238 -50
                -354 -167 -971 -188 -992 -32 -32 -1262 -246 -1250 -218 2 3 73 69 158 146
                402 364 823 786 1165 1167 77 86 143 156 146 156 3 1 5 -9 3 -21z m-8698 -638
                c528 -284 1254 -557 1959 -738 l190 -49 33 -124 c207 -781 408 -1331 696
                -1904 72 -143 131 -264 131 -269 0 -12 -99 -43 -320 -101 -427 -112 -755 -158
                -1130 -159 -234 0 -351 10 -531 44 -636 123 -1085 490 -1297 1060 -176 472
                -183 1105 -22 1805 31 132 135 515 140 515 1 0 69 -36 151 -80z m11034 -121
                c133 -459 194 -850 194 -1254 0 -427 -59 -722 -204 -1022 -253 -525 -724 -841
                -1381 -927 -482 -63 -1113 10 -1726 200 l-112 34 40 73 c22 39 52 96 67 125
                l26 52 91 0 c119 0 209 21 309 69 171 84 288 218 352 406 24 70 27 95 27 205
                0 108 -3 136 -26 205 -37 112 -90 197 -175 281 l-73 73 45 144 c49 156 146
                506 166 600 7 31 18 61 24 66 6 4 54 18 106 31 439 105 1064 315 1496 501 175
                75 540 252 644 312 35 21 46 23 52 13 4 -8 30 -92 58 -187z m-8417 -768 c349
                -71 878 -153 1178 -183 l123 -12 176 -141 c346 -278 701 -543 972 -725 70 -47
                127 -88 128 -91 0 -3 -71 -49 -157 -101 -484 -292 -887 -501 -1336 -692 -172
                -73 -437 -176 -454 -176 -10 0 -164 287 -238 445 -225 479 -447 1097 -574
                1602 -12 45 -24 89 -27 97 -8 21 -11 22 209 -23z m5766 -104 c-21 -79 -63
                -224 -92 -323 l-54 -179 -29 2 c-207 16 -240 15 -324 -6 -135 -33 -221 -82
                -321 -181 -139 -138 -202 -290 -202 -485 0 -119 28 -223 87 -328 46 -84 136
                -181 209 -227 31 -19 56 -39 57 -44 0 -16 -123 -238 -135 -242 -19 -8 -375
                132 -640 252 -189 85 -555 269 -745 375 -210 117 -553 323 -557 335 -2 5 57
                50 129 99 281 191 645 463 962 719 93 75 179 138 190 141 12 2 89 11 171 20
                344 38 952 135 1207 194 139 32 131 44 87 -122z m-3734 -149 c432 -24 1568
                -12 1800 18 l40 5 -39 -33 c-214 -179 -1002 -748 -1038 -748 -20 0 -458 304
                -703 488 -174 132 -354 273 -361 284 -4 7 7 8 32 4 22 -3 143 -11 269 -18z
                m955 -1160 c580 -356 1193 -664 1723 -863 70 -27 127 -52 127 -57 0 -13 -165
                -253 -253 -368 -171 -223 -403 -465 -587 -613 -275 -222 -596 -379 -893 -439
                -96 -20 -142 -23 -317 -23 -229 1 -320 15 -515 80 -517 173 -1027 614 -1447
                1249 l-79 120 38 14 c169 63 446 177 592 243 385 175 895 449 1257 676 139 88
                161 99 179 88 11 -6 90 -55 175 -107z"/>
                <path d="M7615 9744 c-691 -100 -1225 -596 -1365 -1269 -27 -131 -37 -360 -21
                -491 97 -780 714 -1361 1496 -1409 325 -20 686 79 961 263 547 368 813 1025
                674 1663 -118 543 -523 993 -1051 1170 -166 56 -266 71 -474 74 -104 2 -203 1
                -220 -1z"/>
                </g>
                </svg>
            </a>

            <h1
              class="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
            >
              Welcome to QuantumDB
            </h1>

            <p class="mt-4 leading-relaxed dark:text-white text-gray-500">
            Empower Your Data Universe with QuantumDB: Unleash the Power of Next-Generation Database Management.
            </p>
          </div>
          <div className='fixed top-0 right-0 p-5'>
              <Toggle/>
            </div>
          <form action="#" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="FirstName"
                class="block text-sm font-medium dark:text-white text-gray-700"
              >
                First Name
              </label>

              <input
                type="text"
                id="FirstName"
                name="first_name"
                class="mt-1 w-full p-2  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="LastName"
                class="block text-sm font-medium dark:text-white text-gray-700"
              >
                Last Name
              </label>

              <input
                type="text"
                id="LastName"
                name="last_name"
                class="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6">
              <label for="Username" class="block text-sm dark:text-white font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                id="Username"
                name="username"
                class="mt-1 w-full p-2  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="Password"
                class="block text-sm font-medium dark:text-white text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                class="mt-1 w-full p-2  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="PasswordConfirmation"
                class="block text-sm font-medium dark:text-white text-gray-700"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                class="mt-1 w-full p-2  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                  onClick={() => {setAuth('true'); window.location.pathname = ''}}                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Create an account
              </button>

              <p class="mt-4 text-sm text-gray-500 dark:text-white sm:mt-0">
                Already have an account? &nbsp;
                <a href="/login" class="text-gray-700 dark:text-white underline">Log in</a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
    </section>
      )
}

export default CreateProfile
